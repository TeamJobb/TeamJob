import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';
import logo from '../assets/Joblogo.jpg'; // Update this path to match your logo's location

const NavBar = () => {
    return (
        <>
            <div className='topPage'>
                <h4>Welcome to Job Portal</h4>
            </div>
            <Navbar bg="light" expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={logo}
                            alt="Job Portal Logo"
                            style={{ height: '40px' }} // Adjust the height to fit your design
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Job Search</Nav.Link>
                            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <NavDropdown title="Job Seekers" id="job-seekers-dropdown" menuVariant="dark">
                                <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Employers" id="employers-dropdown" menuVariant="dark">
                                <NavDropdown.Item as={Link} to="/login-Employer">Log In</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/sign-up-Employer">Sign Up</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/user-list">
                                <i className="fas fa-users"></i> Users
                            </Nav.Link>
                            <Nav.Link as={Link} to="/logout">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
