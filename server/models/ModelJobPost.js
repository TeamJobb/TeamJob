const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salaryRange: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vacancies: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  employmentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobIndustry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  residenceLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  major: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  careerLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'jobs',
  timestamps: true,
});

module.exports = Job;
