const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { applyForJob, getApplicationsByUserId } = require('../controllers/JobApplicationController.js');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route for applying to a job
router.post('/:jobId/apply', upload.single('cvFile'), applyForJob);

// Route for getting all applications by user ID
router.get('/user/:userId', getApplicationsByUserId);

module.exports = router;
