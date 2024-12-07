const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const authService = require('../services/authService');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

jest.mock('../services/authService');

describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/auth/login should authenticate user', async () => {
        const loginResponse = { token: 'fake-jwt-token' };
        authService.login.mockResolvedValue(loginResponse);

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(loginResponse);
        expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    test('POST /api/auth/sendPasswordReset should send password reset email', async () => {
        const resetResponse = { message: 'Password reset email sent' };
        authService.sendPasswordReset.mockResolvedValue(resetResponse);

        const response = await request(app)
            .post('/api/auth/sendPasswordReset')
            .send({ email: 'test@example.com' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(resetResponse);
        expect(authService.sendPasswordReset).toHaveBeenCalledWith('test@example.com');
    });

    // Ensure the route exists in authRoutes
    test('POST /api/auth/sendPasswordReset route should exist', async () => {
        const response = await request(app)
            .post('/api/auth/sendPasswordReset')
            .send({ email: 'test@example.com' });

        expect(response.status).not.toBe(404);
    });
});