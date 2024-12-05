const { User } = require('../models');
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } = require('../config/firebase');
const jwt = require('jsonwebtoken');

exports.login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '12h' });

        return { token, user };
    } catch (error) {
        throw new Error(error.message || 'An error occurred during login');
    }
};

exports.sendPasswordReset = async (email) => {
    try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        return { message: 'Password reset email sent.' };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while sending password reset email');
    }
};

exports.confirmPasswordReset = async (code, newPassword) => {
    try {
        const auth = getAuth();
        await confirmPasswordReset(auth, code, newPassword);
        return { message: 'Password has been reset.' };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while confirming password reset');
    }
};