const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

const Details = sequelize.define('details', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'details',
    timestamps: false
});

module.exports = Details;