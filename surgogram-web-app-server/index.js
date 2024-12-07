require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3001;

//to parse JSON 
app.use(express.json());

app.use(cors());

//defining routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);

// sequelize.sync({ alter: true }).then(() => {
//     app.listen(port, () => {
//         console.log(`Server is running at http://localhost:${port}`);
//     });
// }).catch(err => {
//     console.error('Unable to sync the database:', err);
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
