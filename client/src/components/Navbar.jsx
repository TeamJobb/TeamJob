import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css'; 
import logo from '../../src/assets/logo.png';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="custom-navbar">
            <Container>
                {/* Logo on the left */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="navbar-logo"
                    />
                    <span className="navbar-title">JobSearch</span>
                </Navbar.Brand>

                {/* Navbar toggle for mobile view */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Links on the right */}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="d-flex align-items-center">
                        <NavDropdown title="Job Seekers" id="job-seekers-dropdown">
                            <NavDropdown.Item as={Link} to="/login">
                                <i className="fas fa-sign-in-alt mr-2"></i> Log In
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/sign-up">
                                <i className="fas fa-user-plus mr-2"></i> Sign Up
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Employers" id="employers-dropdown" className="ml-lg-3">
                            <NavDropdown.Item as={Link} to="/login-Employer">
                                <i className="fas fa-sign-in-alt mr-2"></i> Log In
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/employer-register">
                                <i className="fas fa-user-plus mr-2"></i> Sign Up
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/user-list" className="ml-lg-3">
                            <i className="fas fa-users mr-2"></i> Users
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
