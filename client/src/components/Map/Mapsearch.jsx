import React, { useState } from 'react';
import MapComponent from './MapComponent';

const MapWithSearch = () => {
  const [location, setLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchLocation(location);
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSearch}>
          <input className='SER'
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter a location" 
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <MapComponent location={searchLocation} zoom={13} />
    </div>
  );
};

export default MapWithSearch;
