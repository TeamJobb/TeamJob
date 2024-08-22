const express = require('express');
const { registerUser, loginUser, getAllEmployers } = require('../controllers/Authemployer.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllEmployers); // New route to get all employers

module.exports = router;
