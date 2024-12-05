const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//routers
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

module.exports = router;