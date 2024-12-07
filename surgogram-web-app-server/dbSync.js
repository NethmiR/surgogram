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
