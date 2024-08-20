// models/Company.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Company = sequelize.define('Company', {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
}, {
    timestamps: true,
});

module.exports = Company;
