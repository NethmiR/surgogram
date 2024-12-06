const { Post } = require('../models/Post');
const { uploadImage } = require('./storageService');
const { userExists } = require('./userService');

async function getAllPosts(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    return await Post.findAll({
        order: [
            ['noOfLikes', 'DESC'],
            ['createdAt', 'DESC']
        ],
        limit: pageSize,
        offset: offset
    });
}

async function validatePostData(postData) {
    const { imageFile, description, location, userId } = postData;
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

exports.getAllPosts = async (page, pageSize) => {
    try {
        return await getAllPosts(page, pageSize);
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching user gallery');
    }
};

exports.createPost = async (postData, imageFile) => {
    const transaction = await Post.sequelize.transaction();
    try {
        await validatePostData(postData);

        const { description, location, userId } = postData;

        // Getting the image URL
        let imageUrl = null;
        if (imageFile) {
            imageUrl = await uploadImage('surgogram-post-bucket', imageFile);
        }

        // Saving the post
        const newPost = await Post.create({ URL: imageUrl, description, location, userId });

        await transaction.commit();
        return newPost;

    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message || 'An error occurred while creating the post');
    }
}

exports.patchPost = async (postId) => {
    const transaction = await Post.sequelize.transaction();
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        // Increase the number of likes
        post.noOfLikes += 1;

        await post.save();

        await transaction.commit();
        return post;

    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message || 'An error occurred while updating the post');
    }
}
