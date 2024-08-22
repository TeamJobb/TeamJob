import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import img1 from '../../assets/APACHE.jpg'
import img2 from '../../assets/CRSLOGO.jpg'
import img3 from '../../assets/HamiltoBarness.jpg'
import img4 from '../../assets/Idex_Consulting.jpg'
import img5 from '../../assets/MediaSearchInc.jpg'
import img6 from '../../assets/MERJE.jpg'
import img7 from '../../assets/Thomas_Ren_Associates.jpg'


const employers = [
    { id: 1, name: 'APACHE', image: img1, description: 'APACHE is a renowned online travel agency that empowers travelers to explore and book various aspects of their journeys conveniently. Founded in 1996 as a division of Microsoft, APACHE has evolved into a global platform offering a wide array of travel services, including flights, hotels, vacation rentals, car rentals, cruises, and activities.With its user-friendly website and mobile app, APACHE provides travelers with a seamless booking experience, allowing them to compare prices, read reviews, and make reservations with ease.' },
    { id: 2, name: 'CRSLOGO', image: img2, description: 'Company B specializes in IT services and solutions.' },
    { id: 3, name: 'HamiltoBarness', image: img3, description: 'Company C provides top-notch banking and financial services.' },
    { id: 4, name: 'Idex_Consulting', image: img4, description: 'Company D is known for its innovative tech solutions.' },
    { id: 5, name: 'MediaSearchInc', image: img5, description: 'Company E offers comprehensive marketing and advertising services.' },
    { id: 6, name: 'MERJE', image: img6, description: 'at MERJE, we’re an eating house for the soul. with over 160 uk restaurants and growing, our purpose is to nourish the world from bowl to soul. inspired by fast-paced, japanese ramen bars since 1992. a celebration of asian food brought MERJE to life ' },
    { id: 7, name: 'Thomas_Ren_Associates', image: img7, description: 'Company F delivers premium banking and investment solutions.' },
    /// Ajoutez autant d'employeurs que nécessaire
  ];

  const jobListings = [
    { id: 1, title: 'Cyber Security Specialist', description: 'Cyber Security Specialist, Azure Cloud, VPN, DMZ, CISSP, Part Remote', companyId: 1, location: 'Devonshire Square, London EC2M 4YF, UK', type: 'Hybrid Full Time', salary: '£70,000 to £78,000 Annually', benefits: 'Good benefits', reference: 'EMC/1535' },
    { id: 2, title: 'Marketing', description: 'Cyber Security Specialist, Azure Cloud, VPN, DMZ, CISSP, Part Remote', companyId: 1, location: 'Devonshire Square, London EC2M 4YF, UK', type: 'Hybrid Full Time', salary: '£70,000 to £78,000 Annually', benefits: 'Good benefits', reference: 'EMC/1535' },
    { id: 3, title: 'chauffeur', description: 'Cyber Security Specialist, Azure Cloud, VPN, DMZ, CISSP, Part Remote', companyId: 1, location: 'Devonshire Square, London EC2M 4YF, UK', type: 'Hybrid Full Time', salary: '£70,000 to £78,000 Annually', benefits: 'Good benefits', reference: 'EMC/1535' },
    { id: 4, title: 'it', description: 'Cyber Security Specialist, Azure Cloud, VPN, DMZ, CISSP, Part Remote', companyId: 1, location: 'Devonshire Square, London EC2M 4YF, UK', type: 'Hybrid Full Time', salary: '£70,000 to £78,000 Annually', benefits: 'Good benefits', reference: 'EMC/1535' },
    { id: 5, title: 'Risk Manager', description: 'Marketing Manager, Digital Marketing, SEO, PPC', companyId: 2, location: '123 Marketing Ave, London EC2M 4YF, UK', type: 'Full Time', salary: '£60,000 to £70,000 Annually', benefits: 'Health Insurance', reference: 'MKT/5432' },
    { id: 6, title: 'Manager', description: 'Marketing Manager, Digital Marketing, SEO, PPC', companyId: 2, location: '123 Marketing Ave, London EC2M 4YF, UK', type: 'Full Time', salary: '£60,000 to £70,000 Annually', benefits: 'Health Insurance', reference: 'MKT/5432' },
    { id: 7, title: 'freelancer', description: 'Marketing Manager, Digital Marketing, SEO, PPC', companyId: 2, location: '123 Marketing Ave, London EC2M 4YF, UK', type: 'Full Time', salary: '£60,000 to £70,000 Annually', benefits: 'Health Insurance', reference: 'MKT/5432' },
   
    
    // Add more job listings as needed
  ];
  
const CompanyDetails = () => {
    const { id } = useParams();
    const employer = employers.find(emp => emp.id === parseInt(id));
    const [searchTerm, setSearchTerm] = useState('');
  
    if (!employer) {
      return <div>Company not found</div>;
    }
  
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
    return (
      <div className="container">
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{employer.name}</Card.Title>
                <Card.Img
                  variant="top"
                  src={employer.image}
                  alt={employer.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>About Us</Card.Title>
                <p>{employer.description}</p>
                <Form>
                  <Form.Group controlId="jobSearch">
                    <Form.Label>Job Openings</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search for jobs"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <ul className="list-unstyled mt-4">
                  {jobListings
                    .filter(job => job.companyId === employer.id && job.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(job => (
                      <li key={job.id}>
                        <Link to={`/job/${job.id}`} className="text-decoration-none">
                          <Card className="mb-2">
                            <Card.Body>
                              <Card.Title>{job.title}</Card.Title>
                              <Card.Text>{job.description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </li>
                    ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default CompanyDetails;