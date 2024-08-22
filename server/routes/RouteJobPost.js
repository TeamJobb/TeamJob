// routes/jobRoutes.js
const express = require('express');
const jobController = require('../controllers/controllerJobPost.js');

const router = express.Router();

router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
