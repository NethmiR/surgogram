const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userService = require('../services/userService');
const { authenticateUser } = require('../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

jest.mock('../services/userService');
jest.mock('../middleware/authMiddleware');

describe('User Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/user should create a new user', async () => {
        const newUser = { id: 1, email: 'test@example.com' };
        userService.createUser.mockResolvedValue(newUser);

        const response = await request(app)
            .post('/api/user')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newUser);
        expect(userService.createUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    });

    test('PUT /api/user/:id should update a user', async () => {
        authenticateUser.mockImplementation((req, res, next) => next());
        const updatedUser = { id: 1, email: 'updated@example.com' };
        userService.updateUser.mockResolvedValue(updatedUser);

        const response = await request(app)
            .put('/api/user/1')
            .field('email', 'updated@example.com')
            .attach('imageFile', Buffer.from(''), 'image.png');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedUser);
        expect(userService.updateUser).toHaveBeenCalledWith('1', expect.objectContaining({ email: 'updated@example.com' }));
    });

    test('GET /api/user/:id should return a user by ID', async () => {
        const user = { id: 1, email: 'test@example.com' };
        userService.getUserById.mockResolvedValue(user);

        const response = await request(app).get('/api/user/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
        expect(userService.getUserById).toHaveBeenCalledWith('1');
    });

    test('GET /api/user/:id should return 404 if user not found', async () => {
        userService.getUserById.mockResolvedValue(null);

        const response = await request(app).get('/api/user/1');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'User not found' });
    });
});