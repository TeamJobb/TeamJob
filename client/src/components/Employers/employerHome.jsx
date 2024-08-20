import React from 'react';
import { Container, Row, Col, Button, Card, Image, Carousel} from 'react-bootstrap';
import NavbarEmployer from './NavBarEmployer.jsx'

import leftImage from '../../assets/home2-img2.png';
import rightImage from '../../assets/home3-img.png';


import carouselImage1 from '../../assets/bannersay3.jpg'; // Replace with your actual image paths
import carouselImage2 from '../../assets/bannersay1.jpg';
import carouselImage3 from '../../assets/bannarsay2.jpg';


  // Define the styles here, inside the component scope
  const carouselStyle = {
    maxWidth: '100%',  // Adjust the width as needed
    margin: 'auto'    // Center the carousel
  };

  const carouselItemStyle = {
    maxHeight: '400px', // Adjust the height as needed
    objectFit: 'cover'  // Ensure the image covers the container without distortion
  };


const HomePageEmployer = () => {
  return (
    <>
      <NavbarEmployer />
      <Container fluid className="p-5 bg-light">
        {/* Hero Section */}
        <Row className="mb-5 align-items-center">
          <Col md={4} className="d-flex justify-content-center">
            <Image src={leftImage} fluid className="hero-image" />
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center text-center">
            <h1>The Only Platform You Need to Hire Top Talent</h1>
            <p>Access more than 52,000,000 CVs with verified contact info</p>
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <Image src={rightImage} fluid className="hero-image" />
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="text-center">
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-users icon-color"></i> Biggest Choice of Talent</Card.Title>
                <Card.Text>
                  Access more than 52,000,000 CVs and millions of daily job seekers to find relevant, qualified, and fresh candidates.
                </Card.Text>
                <Button variant="primary">Try for Free</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-clock icon-color"></i> Faster & Easier Hiring</Card.Title>
                <Card.Text>
                  Use artificial intelligence to automate screening, assessments, and shortlisting to save time and effort on hiring.
                </Card.Text>
                <Button variant="primary">Try for Free</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-dollar-sign icon-color"></i> Maximum Recruitment ROI</Card.Title>
                <Card.Text>
                  Get all of your hiring needs done from a single, cost-effective platform and maximize your return on investment.
                </Card.Text>
                <Button variant="primary">Try for Free</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Section */}
        <Row className="mt-5 text-center">
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-bullhorn icon-color"></i> Advertise My Vacancies</Card.Title>
                <Card.Text>
                  Use job postings to reach 10+ million monthly job seekers and receive instant auto-screened applicants.
                </Card.Text>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-search icon-color"></i> Search for Candidates</Card.Title>
                <Card.Text>
                  Search more than 52,000,000 CVs using targeted keywords and 33+ filters to find your ideal candidate in seconds.
                </Card.Text>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title><i className="fas fa-user-tie icon-color"></i> Use a Sourcing Specialist</Card.Title>
                <Card.Text>
                  Share your job descriptions and let our talent sourcing specialists find qualified, relevant & interested candidates.
                </Card.Text>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <Row className="mt-5 text-center">
          <Col>
            <h2>What Our 40,000 Clients Say About Us</h2>
            {/* Add testimonial cards here */}
          </Col>
        </Row>

        {/* Carousel Section */}
        <Row className="mt-5">
          <Col>
            <Carousel style={carouselStyle}>
              <Carousel.Item>
                <Image className="d-block w-100" src={carouselImage1} alt="First slide" style={carouselItemStyle} />
                <Carousel.Caption>
                  <h3>First Slide Label</h3>
                  <p>Some representative placeholder content for the first slide.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image className="d-block w-100" src={carouselImage2} alt="Second slide" style={carouselItemStyle} />
                <Carousel.Caption>
                  <h3>Second Slide Label</h3>
                  <p>Some representative placeholder content for the second slide.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image className="d-block w-100" src={carouselImage3} alt="Third slide" style={carouselItemStyle} />
                <Carousel.Caption>
                  <h3>Third Slide Label</h3>
                  <p>Some representative placeholder content for the third slide.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePageEmployer;