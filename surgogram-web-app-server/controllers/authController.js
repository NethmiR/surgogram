const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.sendPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.sendPasswordReset(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.confirmPasswordReset = async (req, res) => {
    try {
        const { code, newPassword } = req.body;
        const result = await authService.confirmPasswordReset(code, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};