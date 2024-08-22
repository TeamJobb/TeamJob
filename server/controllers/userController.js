const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const path = require('path');
const fs = require('fs');

// Enregistrement d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const {
        firstName, lastName, email, password, phone, mobile, address,
        github, twitter, instagram, facebook, job_title, location, website,
        experience, education, skills, image // Ajout de l'image
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user',
            phone,
            mobile,
            address,
            github,
            twitter,
            instagram,
            facebook,
            job_title,
            location,
            website,
            experience,
            education,
            skills,
            image // Ajout de l'image
        });

        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            mobile: user.mobile,
            address: user.address,
            github: user.github,
            twitter: user.twitter,
            instagram: user.instagram,
            facebook: user.facebook,
            job_title: user.job_title,
            location: user.location,
            website: user.website,
            experience: user.experience,
            education: user.education,
            skills: user.skills,
            image: user.image, // Ajout de l'image
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Authentification d'un utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                mobile: user.mobile,
                address: user.address,
                github: user.github,
                twitter: user.twitter,
                instagram: user.instagram,
                facebook: user.facebook,
                job_title: user.job_title,
                location: user.location,
                website: user.website,
                experience: user.experience,
                education: user.education,
                skills: user.skills,
                image: user.image // Ajout de l'image
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Obtenir un utilisateur par ID
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            mobile: user.mobile,
            address: user.address,
            github: user.github,
            twitter: user.twitter,
            instagram: user.instagram,
            facebook: user.facebook,
            job_title: user.job_title,
            location: user.location,
            website: user.website,
            experience: user.experience,
            education: user.education,
            skills: user.skills,
            image: user.image, // Ajout de l'image
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Mettre à jour un utilisateur par ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        firstName, lastName, email, phone, mobile, address,
        github, twitter, instagram, facebook, job_title, location, website,
        experience, education, skills, image // Ajout de l'image
    } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.update({
            firstName,
            lastName,
            email,
            phone,
            mobile,
            address,
            github,
            twitter,
            instagram,
            facebook,
            job_title,
            location,
            website,
            experience,
            education,
            skills,
            image // Ajout de l'image
        });

        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            mobile: user.mobile,
            address: user.address,
            github: user.github,
            twitter: user.twitter,
            instagram: user.instagram,
            facebook: user.facebook,
            job_title: user.job_title,
            location: user.location,
            website: user.website,
            experience: user.experience,
            education: user.education,
            skills: user.skills,
            image: user.image, // Ajout de l'image
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();

        res.status(204).json(); // Pas de contenu
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fonction pour gérer le téléchargement des images
exports.uploadImage = (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const image = req.files.image;
    const uploadPath = path.join(__dirname, '../uploads/', image.name);

    image.mv(uploadPath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({
            imagePath: `/uploads/${image.name}` // Retourne le chemin de l'image
        });
    });
};
