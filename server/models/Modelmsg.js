// models/messageModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Message = sequelize.define("Message", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  to: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Message;
