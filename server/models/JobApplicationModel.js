const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Chemin vers votre configuration Sequelize

const JobApplication = sequelize.define('JobApplication', {
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coverLetter: {
    type: DataTypes.TEXT,
  },
  cvFile: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = JobApplication;
