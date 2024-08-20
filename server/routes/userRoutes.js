const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload'); // Assurez-vous d'avoir installé express-fileupload
const { registerUser, loginUser, getUser, updateUser, deleteUser, getAllUsers, uploadImage } = require('../controllers/userController.js');

// Middleware pour le téléchargement des fichiers
router.use(fileUpload());

// Route pour télécharger une image
router.post('/upload', uploadImage);

// Ensure these functions are defined in your userController.js
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);
module.exports = router;
