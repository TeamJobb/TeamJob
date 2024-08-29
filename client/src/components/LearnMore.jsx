import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from '../assets/7.jpg'; // Adjust the path as necessary
import img2 from '../assets/8.jpg';
import img3 from '../assets/9.jpg';
import'./Learn.css'

const LearnMore = () => {
    return (
        <div className="learn-more">
            <Container className="my-5">
                <Row className="mb-4">
                    <Col md={12}>
                        <h2 className="text-center">WHY CHOOSE OUR APP?</h2>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={4}>
                        <div className="img-container">
                            <img src={img1} alt="7" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="img-container">
                            <img src={img2} alt="8" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="img-container">
                            <img src={img3} alt="9" />
                        </div>
                    </Col>
                </Row><br></br>
                <Row className="mb-4">
                    <Col md={12}>
                        <p className="paragraph">
                            Over 1 Million Job Listings: We connect you with more than 1 million job opportunities from top companies across the globe, updated daily to ensure you never miss out on your dream job.
                        </p>
                        <p className="paragraph">
                            80% User Satisfaction Rate: Our app boasts a user satisfaction rate of 80%, with users praising our intuitive interface, powerful search filters, and personalized job recommendations.
                        </p>
                        <p className="paragraph">
                            20,000 Successful Hires Monthly: Every month, 20,000 job seekers find their next opportunity through our platform, making us one of the most trusted job search apps in the industry.
                        </p>
                        <p className="paragraph">
                            The only talent management platform purpose-built for location-based, high-volume hiring, TalentReef automates processes and optimizes workflows to remove friction for candidates and hiring managers. TalentReef has everything you need for success today, plus the flexibility to adapt to tomorrow’s changes.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LearnMore;
