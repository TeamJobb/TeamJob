
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './App.jsx'; // Importez AppContent au lieu de App
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContent /> {/* Render AppContent directly */}
  </React.StrictMode>
);