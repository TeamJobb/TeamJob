const JobApplication = require('../models/JobApplicationModel.js');
const path = require('path');
const fs = require('fs');

// Fonction pour postuler à un emploi
const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { userId, coverLetter } = req.body;
  const cvFile = req.file ? req.file.filename : null;

  try {
    const application = await JobApplication.create({
      jobId,
      userId,
      coverLetter,
      cvFile,
    });
    res.status(201).json(application);
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Error applying for job' });
  }
};

// Fonction pour obtenir toutes les candidatures d'un utilisateur par ID
const getApplicationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await JobApplication.findAll({ where: { userId } });
    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error retrieving applications by userId:', error);
    res.status(500).json({ message: 'Error retrieving applications' });
  }
};

module.exports = {
  applyForJob,
  getApplicationsByUserId,
};
