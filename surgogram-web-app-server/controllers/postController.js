const postService = require('../services/postService');
const { authenticateUser } = require('../middleware/authMiddleware');

exports.createPost = [
    authenticateUser,
    async (req, res) => {
        try {
            const postData = req.body;
            const newPost = await postService.createPost(postData);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

exports.updatePost = [
    authenticateUser,
    async (req, res) => {
        try {
            const postId = req.params.id;
            const postData = req.body;
            const updatedPost = await postService.updatePost(postId, postData);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
            res.status(400).json({ error: error.message });
        }
    }
];

// exports.deletePost = [
//     authenticateUser,
//     async (req, res) => {
//         try {
//             const postId = req.params.id;
//             await postService.deletePost(postId);
//             res.status(204).send();
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// ];