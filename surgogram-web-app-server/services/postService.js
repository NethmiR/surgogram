const Post = require('../models/Post');
const User = require('../models/User'); 
const { uploadImage } = require('./storageService');
const { userExists } = require('./userService');

exports.getAllPosts = async (page = 1, pageSize = 10) => {
    try {
        const offset = (page - 1) * pageSize;
        const { count, rows } = await Post.findAndCountAll({
            order: [
                ['noOfLikes', 'DESC'],
                ['createdAt', 'DESC']
            ],
            limit: pageSize,
            offset: offset,
            include: [{ model: User, as: 'user' }] // Include the user relation
        });
        return { totalPosts: count, posts: rows };
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

// ...existing code...

exports.patchPost = async (postId) => {
    const transaction = await Post.sequelize.transaction();
    try {
        const post = await Post.findByPk(postId, { transaction });
        if (!post) {
            throw new Error('Post not found');
        }
        // Increase the number of likes
        post.noOfLikes += 1;
        await post.save({ transaction });
        await transaction.commit();
        return post;
    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message || 'An error occurred while updating the post');
    }
}
