import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'black', color: 'white' }} className="py-3">
            <Container>
                <Row>
                    <Col sm={12} md={3}>
                        <h2>Exclusive</h2>
                        <ul>
                            <li>Subscription</li>
                            <li>Get 10% off your first CV</li>
                        </ul>
                    </Col>
                    <Col sm={12} md={3}>
                        <h2>Support</h2>
                        <ul>
                            <li>Support Center</li>
                            <li>FAQs</li>
                            <li>Help</li>
                        </ul>
                    </Col>
                    <Col sm={12} md={3}>
                        <h2>Call To Us</h2>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p><i className="fas fa-phone"></i> <strong>Phone:</strong> +21671111000</p>
                    </Col>
                    <Col sm={12} md={3}>
                        <h2>Write To Us</h2>
                        <p><i className="fas fa-envelope"></i> <strong>Emails:</strong> customer@exclusive.com</p>
                        <p><i className="fas fa-envelope"></i> <strong>Emails:</strong> support@exclusive.com</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} style={{ textAlign: 'center' }}>
                        <p>© 2024 Exclusive. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
