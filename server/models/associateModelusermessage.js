// models/associations.js
const User = require('./user');
const Message = require('./messageModel.js');

// Définir les associations
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'recipientId', as: 'receivedMessages' });

Message.belongsTo(User, { as: 'senderUser', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'recipientUser', foreignKey: 'recipientId' });
