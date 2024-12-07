const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../sequelize');

class User extends Model {
    static associate(models) {
        User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
});

module.exports = User;
