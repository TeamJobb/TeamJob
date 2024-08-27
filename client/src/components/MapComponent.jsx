import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordonnées des pays pour simplifier
const countryCoordinates = {
  US: [37.0902, -95.7129],
  CA: [56.1304, -106.3468],
  FR: [46.6034, 1.8883],
  // Ajoutez d'autres coordonnées ici
};

const MapComponent = ({ countryCode, zoom }) => {
const [position, setPosition] = useState([51.505, -0.09]); // Position par défaut (Londres)

  useEffect(() => {
    if (countryCode && countryCoordinates[countryCode]) {
      setPosition(countryCoordinates[countryCode]);
    }
  }, [countryCode]);

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={position}>
        <Popup>
          {countryCode ? `Country: ${countryCode}` : 'Select a country'}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
