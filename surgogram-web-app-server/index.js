const config = require('./config/config.js');
const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const port = 3001;

//to parse JSON 
app.use(express.json());

//defining routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);


