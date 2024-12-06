'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}

Post.init({
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
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Post',
    timestamps: true,
    indexes: [
        { fields: ['noOfLikes'] },
        { fields: ['createdAt'] },
    ],
});

module.exports = Post;
