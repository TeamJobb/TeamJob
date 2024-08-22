import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = ({ location, zoom }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // Position par défaut (Londres)

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (location) {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
          if (response.data.length > 0) {
            console.log(response.data);
            const { lat, lon } = response.data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          }
        } catch (error) {
          console.error('Error fetching coordinates', error);
        }
      }
    };
    fetchCoordinates();
  }, [location]);

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={position}>
        <Popup>
          {location ? `Location: ${location}` : 'Select a location'}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
