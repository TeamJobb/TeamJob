import React from 'react';
import { Form, Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchSection.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const SearchSection = ({ onSearch }) => {
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

      {/* Caption and Search bar container */}
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
          textAlign: 'center', // Ensure the text is centered
        }}
      >
        {/* Caption */}
        <div className="caption" style={{ marginBottom: '20px' }}>
          <h1 className="fw-bold text-white" style={{ fontSize: '2.5rem' }}>Find the perfect profession for you</h1>
        </div>
        {/* Search bar */}
        <div className="search-bar-container" style={{ width: '80%', maxWidth: '600px' }}>
          <Form className="d-flex search-bar-form">
            <Form.Control
              type="search"
              placeholder="Search jobs..."
              className="me-2"
              aria-label="Search"
              style={{ padding: '10px', fontSize: '1rem' }}
            />
            <Button variant="primary">Search</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
