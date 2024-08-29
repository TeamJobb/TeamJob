import React, { useState } from 'react';
import { Form, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchSection.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="carousel-container" style={{ position: 'relative' }}>
      <Carousel style={{ width: '100%', height: '500px', margin: '0 auto' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>

      <div
        className="caption-search-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center', 
        }}
      >
        <div className="caption" style={{ marginBottom: '20px' }}>
          <h1 className="fw-bold text-white" style={{ fontSize: '2.5rem' }}>Find the perfect profession for you</h1>
        </div>
        <div className="search-bar-container" style={{ width: '80%', maxWidth: '600px' }}>
          <Form className="d-flex search-bar-form">
            <Form.Control
              type="search"
              placeholder="Search jobs..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchInputChange}
              style={{ padding: '10px', fontSize: '1rem' }}
            />
           <Button 
  className='BT' 
  style={{ backgroundColor: 'rgb(53, 122, 224)', borderColor: 'black',color:'white' , padding: '10px 15px'}} 
  onClick={handleSearchClick}
>
  Search
</Button>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
