const path = require('path');
const fs = require('fs');
const sequelize = require('./sequelize');

const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(file => {
    const model = require(path.join(modelsPath, file));
    model(sequelize);
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });
// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('PostgreSQL connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// testConnection();