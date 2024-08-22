// models/notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Notification = sequelize.define('Notification', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Notification;