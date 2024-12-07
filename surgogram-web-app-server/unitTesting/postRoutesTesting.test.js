
const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/postRoutes');
const postService = require('../services/postService');
const { authenticateUser } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(express.json());
app.use('/api/post', postRoutes);

jest.mock('../services/postService');
jest.mock('../middleware/authMiddleware');

describe('Post Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/post should create a new post', async () => {
        authenticateUser.mockImplementation((req, res, next) => next());
        const newPost = { id: 1, title: 'Test Post' };
        postService.createPost.mockResolvedValue(newPost);

        const response = await request(app)
            .post('/api/post')
            .field('title', 'Test Post')
            .attach('imageFile', Buffer.from(''), 'image.png');

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newPost);
        expect(postService.createPost).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Post' }), expect.any(Object));
    });

    test('GET /api/post should return all posts', async () => {
        authenticateUser.mockImplementation((req, res, next) => next());
        const posts = [{ id: 1, title: 'Test Post' }];
        postService.getAllPosts.mockResolvedValue(posts);

        const response = await request(app).get('/api/post');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(posts);
        expect(postService.getAllPosts).toHaveBeenCalledWith(undefined, undefined);
    });

    test('PATCH /api/post/:id should update a post', async () => {
        authenticateUser.mockImplementation((req, res, next) => next());
        const updatedPost = { id: 1, title: 'Updated Post' };
        postService.patchPost.mockResolvedValue(updatedPost);

        const response = await request(app).patch('/api/post/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedPost);
        expect(postService.patchPost).toHaveBeenCalledWith('1');
    });
});