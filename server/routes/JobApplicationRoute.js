const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/JobApplicationController.js');

// Créer une candidature
router.post('/', applicationController.createApplication);

// Obtenir toutes les candidatures d'un utilisateur
router.get('/user/:userId', applicationController.getUserApplications);

// Obtenir toutes les candidatures pour un emploi
router.get('/job/:jobId', applicationController.getJobApplications);

module.exports = router;
