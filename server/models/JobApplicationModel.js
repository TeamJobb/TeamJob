const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Application = sequelize.define('Application', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nom de la table des utilisateurs
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs', // Nom de la table des emplois
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'applied' // Statut par défaut (appliqué, interview, etc.)
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'applications',
  timestamps: false
});

module.exports = Application;
