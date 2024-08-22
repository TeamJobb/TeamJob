const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const EmployerUser = sequelize.define('EmployerUser', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EmployerUser;
