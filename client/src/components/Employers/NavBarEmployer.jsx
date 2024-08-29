import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBriefcase, FaFileAlt, FaUsers, FaSignOutAlt, FaHome, FaSuitcase } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarEmployer = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="py-3 shadow-sm">
      <Navbar.Brand as={Link} to="/" className="text-info font-weight-bold">
        <FaHome size={20} /> <span className="ml-2">Home Page</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
      <Navbar.Collapse id="navbarTogglerDemo02">
        <Nav className="mr-auto mt-2 mt-lg-0">
          <Nav.Link as={Link} to="/Post-Job" className="d-flex align-items-center">
            <FaBriefcase size={18} className="mr-2" /> 
            <span>Post Your Job</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/Myworkspace" className="d-flex align-items-center">
            <FaSuitcase size={18} className="mr-2" /> 
            <span>My Work Space</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/CV-Search" className="d-flex align-items-center">
            <FaFileAlt size={18} className="mr-2" /> 
            <span>CV Search</span>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto align-items-center">
          <Nav.Link as={Link} to="/user-list" className="d-flex align-items-center">
            <FaUsers size={20} className="mr-2" /> 
          </Nav.Link>
          <Nav.Link as={Link} to="/" className="d-flex align-items-center">
            <FaSignOutAlt size={20} className="mr-2" /> 
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarEmployer;
