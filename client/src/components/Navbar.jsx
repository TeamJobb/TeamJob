import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css'; // Ensure your custom styles are in this file

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="custom-navbar">
            <Container>
            <Navbar.Brand as={Link} to="/" style={{color:'blue'}}>
     JobSearch
 </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <div className="ml-auto d-flex">
                        <NavDropdown title="Job Seekers" id="job-seekers-dropdown">
                            <NavDropdown.Item as={Link} to="/login">
                                <i className="fas fa-sign-in-alt"></i> Log In
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/sign-up">
                                <i className="fas fa-user-plus"></i> Sign Up
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Employers" id="employers-dropdown" className="ml-3">
                            <NavDropdown.Item as={Link} to="/login-Employer">
                                <i className="fas fa-sign-in-alt"></i> Log In
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/sign-up-Employer">
                                <i className="fas fa-user-plus"></i> Sign Up
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/user-list" className="ml-3">
                            <i className="fas fa-users"></i> Users
                        </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
