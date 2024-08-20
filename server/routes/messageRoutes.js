const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController.js');

// Assume authentication middleware is applied globally or at this route level
router.post('/', sendMessage);

module.exports = router;
