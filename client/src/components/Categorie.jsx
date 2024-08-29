import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages/Home/Hero.jsx';

const Categorie = () => {
    const categories = [
        { name: 'Free Advice Service', icon: 'fas fa-lightbulb', link: '/free-advice' },
        { name: 'Learn More About Our App', icon: 'fas fa-headphones-alt', link: '/learn-more' },
        { name: 'Prohibited Actions In Our App', icon: 'fas fa-ban', link: '/prohibited-actions' },
    ];

    return (
        <div className="my-5">
            <Row className='row'>
                {categories.map((category, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                        <Link to={category.link} style={{ textDecoration: 'none' }}>
                            <Card className="text-center my-3 p-3 rounded" style={{ width: '18rem', backgroundColor: 'rgb(60, 126, 191)' }}>
                                <i className={`fas ${category.icon} fa-4x`} style={{ color: 'white' }}></i>
                                <Card.Body>
                                    <Card.Title as="div" style={{ color: 'white' }}>
                                        <strong>{category.name}</strong>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Categorie;
