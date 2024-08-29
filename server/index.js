const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const socket = require("socket.io");
const sequelize = require("./config/database.js"); // importez la config Sequelize

// Importation des routes
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const employerRoutes = require('./routes/auth.employer.js'); 
const jobRoutes = require('./routes/RouteJobPost.js');
const jobApplicationRoutes = require('./routes/JobApplicationRoute.js');
// Importation des modèles pour synchroniser la base de données
const User = require('./models/user.js');
const Message = require('./models/Modelmsg.js');
const Employer = require('./models/employeruser.js');
const Job = require('./models/ModelJobPost.js');


const app = express();

// Configuration de CORS pour Express
app.use(cors({
  origin: 'http://localhost:5173', // Remplacez ceci par l'adresse de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json()); // Permet de traiter les requêtes avec du JSON

// Synchroniser la base de données
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', jobApplicationRoutes);

// Route de test
app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3022;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configuration du WebSocket
const io = socket(server, {
  cors: {
    origin: 'http://localhost:5173', // Remplacez ceci par l'adresse de votre frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});