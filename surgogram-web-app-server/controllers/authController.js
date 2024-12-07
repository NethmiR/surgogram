const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Email not found' || error.message === 'Incorrect password' || error.message === 'Email not verified') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.sendPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.sendPasswordReset(email);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

