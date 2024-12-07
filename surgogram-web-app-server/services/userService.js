const { User } = require('./../models');
const { uploadImage } = require('./storageService');
const {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} = require('./../firebase');

function validateUserData(userData) {
    const { email, password } = userData;
    if (!email || !password) {
        if (!email) {
            throw new Error('Email is required');
        }
        if (!password) {
            throw new Error('Password is required');
        }
    }
}

exports.createUser = async (userData) => {
    try {
        validateUserData(userData);
        const { email, password } = userData;

        // Creating user with Firebase
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        await sendEmailVerification(userCredential.user);

        // Saving the user
        const newUser = await User.create({ email });

        return newUser;

    } catch (error) {

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
            console.log('File uploaded:', imageFile);
            imageUrl = await uploadImage('surgogram-profile-bucket', imageFile);
        } else {
            console.log('No file uploaded');
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

exports.getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching the user");
    }
};

// use for the external services
exports.userExists = async (userId) => {
    const user = await User.findByPk(userId);
    return !!user;
};

