const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController.js');

// Assurez-vous que ces méthodes existent dans le NotificationController
router.get('/', NotificationController.getAllNotifications);
router.post('/', NotificationController.createNotification);

module.exports = router;
