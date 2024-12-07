const { User } = require('./../models');
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } = require('./../firebase');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

exports.login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found in the database');
        }

        // Check email is verified
        if (!userCredential.user.emailVerified) {
            throw new Error('Email not verified');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

        return { token, user };
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            throw new Error('Email not found');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Incorrect password');
        } else {
            throw new Error(error.message || 'An error occurred during login');
        }
    }
};

exports.sendPasswordReset = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        return { message: 'Password reset email sent.' };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while sending password reset email');
    }
};

