const postService = require('../services/postService');
const { authenticateUser } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

exports.createPost = [
    authenticateUser,
    upload.single('imageFile'),
    async (req, res) => {
        try {
            const postData = req.body;
            const imageFile = req.file;
            const newPost = await postService.createPost(postData, imageFile);
            res.status(201).json(newPost);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message || 'An error occurred while creating the post' });
        }
    }
];

exports.getAllPosts = [
    authenticateUser,
    async (req, res) => {
        try {
            const { page, pageSize } = req.query;
            const posts = await postService.getAllPosts(page, pageSize);
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message || 'An error occurred while fetching posts' });
        }
    }
];

exports.patchPost = [
    authenticateUser,
    async (req, res) => {
        try {
            const postId = req.params.id;
            const updatedPost = await postService.patchPost(postId);
            res.status(200).json(updatedPost);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message || 'An error occurred while updating the post' });
        }
    }
];