const { User } = require('../models/User');
const { uploadImage } = require('../storageService');
const {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} = require('../../firebase');

function validateUserData(userData) {
    const { email, password, fullName, userName } = userData;
    if (!email || !password || !fullName || !userName) {
        if (!email) {
            throw new Error('Email is required');
        }
        if (!password) {
            throw new Error('Password is required');
        }
        if (!fullName) {
            throw new Error('Full name is required');
        }
        if (!userName) {
            throw new Error('Username is required');
        }
    }
}

exports.createUser = async (userData) => {
    const transaction = await User.sequelize.transaction();
    try {
        validateUserData(userData);

        const { email, password, fullName, userName } = userData;

        // Creating user with Firebase
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        await sendEmailVerification(userCredential.user);

        // Saving the user
        const newUser = await User.create({ email, fullName, userName });

        await transaction.commit();
        return newUser;

    } catch (error) {
        await transaction.rollback();

        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Email is already in use');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email address');
        } else {
            throw new Error(error.message || "An error occurred while creating the user");
        }
    }
};

exports.updateUser = async (userId, userData) => {
    const transaction = await User.sequelize.transaction();
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const { fullName, userName, imageFile } = userData;

        // Getting the image URL
        let imageUrl = null;
        if (imageFile) {
            imageUrl = await uploadImage('surgogram-profile-bucket', imageFile);
        }

        // Updating the changed fields
        user.fullName = fullName || user.fullName;
        user.userName = userName || user.userName;
        user.profileUrl = imageUrl || user.profileUrl;
        await user.save();

        await transaction.commit();
        return user;

    } catch (error) {
        await transaction.rollback();
        throw new Error(error.message || "An error occurred while updating the user");
    }
};

// use for the external services
exports.userExists = async (userId) => {
    const user = await User.findByPk(userId);
    return !!user;
};