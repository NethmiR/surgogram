'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Post.hasMany(models.Like, { foreignKey: 'postId', as: 'likes' });
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
    return Post;
};
