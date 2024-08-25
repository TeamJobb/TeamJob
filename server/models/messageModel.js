// models/messageModel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Importez le modèle User

class Message extends Model {}

Message.init({
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Message',
});

// Définir les associations
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

module.exports = Message;
