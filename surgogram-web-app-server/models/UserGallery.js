const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const UserGallery = sequelize.define('UserGallery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    noOfLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    indexes: [
        { fields: ['noOfLikes'] },
        { fields: ['createdAt'] },
    ],
});

module.exports = UserGallery;
