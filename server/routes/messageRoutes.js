const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js'); // Vérifiez le chemin

// Définition des routes pour les messages
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getMessageById);
router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
