require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const port = process.env.PORT || 3001;

//to parse JSON 
app.use(express.json());

//defining routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


