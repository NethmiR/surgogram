const userService = require('../services/userService');
const { authenticateUser } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = [
    authenticateUser,
    upload.single('imageFile'),
    async (req, res) => {
        try {
            const userId = req.params.id;
            const userData = req.body;
            if (req.file) {
                userData.imageFile = req.file;
            } else {
                return res.status(400).json({ error: 'Image is required' });
            }
            const updatedUser = await userService.updateUser(userId, userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
];

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

