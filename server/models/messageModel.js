// models/message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Message = sequelize.define('Message', {
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Message;
