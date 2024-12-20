const { Post, User, Like } = require('../models');
const { uploadImage } = require('./storageService');
const { userExists } = require('./userService');

exports.getAllPosts = async (userId, page = 1, pageSize = 10) => {
    try {
        const offset = (page - 1) * pageSize;
        const { count, rows } = await Post.findAndCountAll({
            order: [
                ['createdAt', 'DESC'],
                ['noOfLikes', 'DESC']
            ],
            limit: pageSize,
            offset: offset,
            include: [{ model: User, as: 'user' }]
        });

        const posts = await Promise.all(rows.map(async post => {
            const isUserLiked = await Like.findOne({ where: { postId: post.id, userId } }) !== null;
            return { ...post.toJSON(), isUserLiked };
        }));

        return { totalPosts: count, posts };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching user gallery');
    }
};

async function validatePostData(postData, imageFile) {
    const { description, location, userId } = postData;
    if (!imageFile || !description || !location || !userId) {
        if (!imageFile) {
            throw new Error('Image is required');
        }
        if (!description) {
            throw new Error('Description is required');
        }
        if (!location) {
            throw new Error('Location is required');
        }
        if (!userId) {
            throw new Error('User ID is required');
        }
    }

    if (!await userExists(userId)) {
        throw new Error('User does not exist');
    }
}

exports.createPost = async (postData, imageFile) => {
    try {
        await validatePostData(postData, imageFile);

        const { description, location, userId } = postData;

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Getting the image URL
        let imageUrl = null;
        if (imageFile) {
            console.log(imageFile);
            imageUrl = await uploadImage('surgogram-post-bucket', imageFile);
        }

        // Saving the post
        const newPost = await Post.create({ URL: imageUrl, description, location, userId });
        return newPost;

    } catch (error) {
        throw new Error(error.message || 'An error occurred while creating the post');
    }
}

exports.addLike = async (postId, userId) => {
    const transaction = await Like.sequelize.transaction();
    try {
        const post = await Post.findByPk(postId, { transaction });
        if (!post) {
            throw new Error('Post not found');
        }

        const user = await User.findByPk(userId, { transaction });
        if (!user) {
            throw new Error('User not found');
        }

        const existingLike = await Like.findOne({ where: { postId, userId }, transaction });
        if (existingLike) {
            await existingLike.destroy({ transaction });
            post.noOfLikes -= 1;
            await post.save({ transaction });
            await transaction.commit();
            return;
        }

        const newLike = await Like.create({ postId, userId }, { transaction });

        post.noOfLikes += 1;
        await post.save({ transaction });

        await transaction.commit();
        return newLike;
    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message || 'An error occurred while liking the post');
    }
}

