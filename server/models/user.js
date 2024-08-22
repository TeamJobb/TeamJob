const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class User extends Model {}

User.init({
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
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  job_title: DataTypes.STRING,
  location: DataTypes.STRING,
  website: DataTypes.STRING,
  github: DataTypes.STRING,
  twitter: DataTypes.STRING,
  instagram: DataTypes.STRING,
  facebook: DataTypes.STRING,
  phone: DataTypes.STRING,
  mobile: DataTypes.STRING,
  address: DataTypes.STRING,
  experience: DataTypes.TEXT,
  education: DataTypes.TEXT,
  skills: DataTypes.TEXT,
  image: DataTypes.STRING // Ajout de l'image
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true // Pour `createdAt` et `updatedAt`
});

module.exports = User;
