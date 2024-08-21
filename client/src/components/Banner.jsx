import React from 'react';
import { Carousel, Image, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import img1 from '../../src/assets/APACHE.jpg';
import img2 from '../../src/assets/CRSLOGO.jpg';
import img3 from '../../src/assets/HamiltoBarness.jpg';
import img4 from '../../src/assets/Idex_Consulting.jpg';
import img5 from '../../src/assets/MediaSearchInc.jpg';
import img6 from '../../src/assets/MERJE.jpg';
import img7 from '../../src/assets/Thomas_Ren_Associates.jpg';

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
  // Group items into sets of 4
  const groupedItems = [];
  for (let i = 0; i < employers.length; i += 4) {
    groupedItems.push(employers.slice(i, i + 4));
  }

  return (
    <Container fluid style={{ padding: '20px 0' }}>
      <h2 className="text-center mb-4">Our Partners</h2>
      <Carousel>
        {groupedItems.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="d-flex justify-content-center">
              {group.map((employer) => (
                <Col key={employer.id} xs={12} md={3} className="d-flex justify-content-center mb-4">
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Image 
                      src={employer.image} 
                      alt={employer.name} 
                      fluid 
                      style={{ maxHeight: '120px', objectFit: 'contain', marginBottom: '10px' }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>{employer.name}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Banner;
