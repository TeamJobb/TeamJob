import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure FontAwesome is included

const NavbarEmployer = () => {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="py-2">
      <Navbar.Brand as={Link} to="/" className="text-info">
        Home Page
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
      <Navbar.Collapse id="navbarTogglerDemo02">
        <Nav className="mr-auto mt-2 mt-lg-0">
        <Nav.Link as={Link} to="/Post-Job">
            Post Your Job
          </Nav.Link>
          <Nav.Link as={Link} to="/Workspace">
            My Workspace
          </Nav.Link>
          <Nav.Link as={Link} to="/CV-Search">
            CV Search
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            Blog
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto align-items-center">
          <Nav.Link as={Link} to="/user-list">
            <i className="fas fa-users"></i> {/* Icon for user list */}
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            <i className="fas fa-sign-out-alt"></i> {/* Icon for logout */}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarEmployer;
