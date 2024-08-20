const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware d'authentification
const auth = (req, res, next) => {
    // Récupérer le token depuis les en-têtes
    const token = req.headers['authorization']?.split(' ')[1];

    // Vérifier si le token est présent
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Vérifier et décoder le token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        // Ajouter les informations de l'utilisateur à la requête
        req.user = decoded;
        next();
    });
};

module.exports = auth;
