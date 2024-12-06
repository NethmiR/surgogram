const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// routers
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.get('/', postController.getAllPosts);
// router.delete('/posts/:id', postController.deletePost);

module.exports = router;