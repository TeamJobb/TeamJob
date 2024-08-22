import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import img1 from '../../src/assets/APACHE.jpg'
import img2 from '../../src/assets/CRSLOGO.jpg'
import img3 from '../../src/assets/HamiltoBarness.jpg'
import img4 from '../../src/assets/Idex_Consulting.jpg'
import img5 from '../../src/assets/MediaSearchInc.jpg'
import img6 from '../../src/assets/MERJE.jpg'
import img7 from '../../src/assets/Thomas_Ren_Associates.jpg'


const employers = [
  { id: 1, name: 'APACHE', image: img1 },
  { id: 2, name: 'CRSLOGO', image: img2 },
  { id: 3, name: 'HamiltoBarness', image: img3 },
  { id: 4, name: 'Idex Consulting', image: img4 },
  { id: 5, name: 'MediaSearch Inc', image: img5 },
  { id: 6, name: 'MERJE', image: img6 },
  { id: 7, name: 'Thomas Ren Associates', image: img7 },
];

const Banner = () => {
  return (
      <div className="container mt-4">
          <h2 className="text-center mb-4">Our Partners</h2>
          <Carousel>
              {employers.map((employer) => (
                  <Carousel.Item key={employer.id}>
                      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                          <Image 
                              src={employer.image} 
                              alt={employer.name} 
                              fluid 
                              style={{ maxHeight: '100%', objectFit: 'contain' }} 
                          />
                      </div>
                      <Carousel.Caption>
                          <h3>{employer.name}</h3>
                      </Carousel.Caption>
                  </Carousel.Item>
              ))}
          </Carousel>
      </div>
  );
};

export default Banner;