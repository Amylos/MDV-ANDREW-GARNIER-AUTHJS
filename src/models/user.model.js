const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin", "student", "teacher"),
        allowNull: false,
        defaultValue: "student"
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
