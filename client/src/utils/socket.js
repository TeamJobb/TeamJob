// src/socket.js
import io from "socket.io-client";

const URL = "http://localhost:3022"; // Remplacez par l'URL de votre serveur

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false
});

export default socket;
