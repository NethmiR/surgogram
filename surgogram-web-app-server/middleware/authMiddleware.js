const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = 'your_jwt_secret';

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            where: { id: decoded.id },
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateUser };
