const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
   
  },
  salaryRange: {
    type: DataTypes.STRING,
    
  },
  vacancies: {
    type: DataTypes.INTEGER,
  
  },
  employmentType: {
    type: DataTypes.STRING,
    
  },
  jobLocation: {
    type: DataTypes.STRING,
    
  },
  jobIndustry: {
    type: DataTypes.STRING,
    
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
