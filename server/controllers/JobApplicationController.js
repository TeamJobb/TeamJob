const Application = require('../models/JobApplicationModel.js');

// Créer une nouvelle candidature
exports.createApplication = async (req, res) => {
  const { userId, jobId, status } = req.body;

  try {
    const application = await Application.create({ userId, jobId, status });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create application', error });
  }
};

// Obtenir toutes les candidatures d'un utilisateur
exports.getUserApplications = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await Application.findAll({ where: { userId } });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve applications', error });
  }
};

// Obtenir toutes les candidatures pour un emploi
exports.getJobApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.findAll({ where: { jobId } });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve applications', error });
  }
};
