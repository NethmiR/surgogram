const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// routers
router.post('/', postController.createPost);
router.patch('/:id', postController.patchPost);
router.get('/', postController.getAllPosts);

module.exports = router;