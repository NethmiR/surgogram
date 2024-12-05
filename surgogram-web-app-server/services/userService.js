const { User } = require('../models');
const { uploadImage } = require('../storageService');
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
} = require('../config/firebase');

function validateUserData(userData) {
    const { email, password, fullName, userName, imageFile } = userData;
    if (!email || !password || !fullName || !userName || !imageFile) {
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
        if (!imageFile) {
            throw new Error('Profile image is required');
        }
    }
}

exports.createUser = async (userData) => {
    const transaction = await User.sequelize.transaction();
    try {
        validateUserData(userData);

        const { email, password, fullName, userName, imageFile } = userData;

        // Getting the image URL
        let imageUrl = null;
        if (imageFile) {
            imageUrl = await uploadImage('surgogram-profile-bucket', imageFile);
        }

        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        await sendEmailVerification(userCredential.user);

        // Saving the user
        const newUser = await User.create({ email, fullName, userName, profileUrl: imageUrl });

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

// use for the external services
exports.userExists = async (userId) => {
    const user = await User.findByPk(userId);
    return !!user;
};