import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import pour l'animation
import 'bootstrap-icons/font/bootstrap-icons.css'; // Assurez-vous que le chemin est correct
import './CVSearchPage.css';
import welcomeImage from '../../assets/cvsearch-img.png'; // Assurez-vous que le chemin est correct
import footerImage from '../../assets/welcome.jpg'; 

const CVSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    location: '',
    experience: '',
    jobTitle: '',
    skills: ''
  });
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3020/api/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const texts = ['Find ', 'Contact ', 'Hire '];
    const interval = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  const applyFilters = () => {
    let filtered = users;

    if (searchCriteria.name) {
      filtered = filtered.filter(user =>
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchCriteria.name.toLowerCase())
      );
    }

    if (searchCriteria.location) {
      filtered = filtered.filter(user => user.location.toLowerCase().includes(searchCriteria.location.toLowerCase()));
    }

    if (searchCriteria.experience) {
      filtered = filtered.filter(user => {
        if (searchCriteria.experience === 'noExperience') return user.experience.length === 0;
        if (searchCriteria.experience === '1Year') return user.experience.some(exp => exp.year === '1');
        if (searchCriteria.experience === '2Years') return user.experience.some(exp => exp.year === '2');
        if (searchCriteria.experience === 'moreThan2Years') return user.experience.some(exp => exp.year > '2');
        return true;
      });
    }

    if (searchCriteria.jobTitle) {
      filtered = filtered.filter(user => user.job_title.toLowerCase().includes(searchCriteria.jobTitle.toLowerCase()));
    }

    if (searchCriteria.skills) {
      filtered = filtered.filter(user =>
        user.skills.some(skill => skill.toLowerCase().includes(searchCriteria.skills.toLowerCase()))
      );
    }

    setFilteredUsers(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (filteredUsers.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <Container fluid className="cv-search-container">
      {/* Section with text and image */}
      <Row className="welcome-section mb-4">
        <Col md={6}>
          <h1>Welcome to CV Search</h1>
          <row>'       </row>
          <p>Struggling to find the right candidate for your role? Search our database of over 52 million job seekers and connect with your next top hire.</p>
        </Col>
        
        <Col md={6} className="d-flex align-items-center">
          <img src={welcomeImage} alt="CV Search" className="welcome-image" />
        </Col>
      </Row>

      <Row>
        <Col md={3} className="search-column">
          <Card className="search-cardcv mb-4">
            <Card.Body>
              <h4>
                <i className="bi bi-search"></i> {['Find Your Ideal Candidates', 'Contact Your Ideal Candidates', 'Hire Your Ideal Candidates'][textIndex]}
              </h4>
              <Form>
                <Form.Group controlId="searchName">
                  <Form.Label><i className="bi bi-person"></i> Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name"
                    name="name"
                    value={searchCriteria.name}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
                <Form.Group controlId="searchLocation">
                  <Form.Label><i className="bi bi-geo-alt"></i> Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by location"
                    name="location"
                    value={searchCriteria.location}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
                <Form.Group controlId="searchExperience">
                  <Form.Label><i className="bi bi-briefcase"></i> Experience</Form.Label>
                  <Form.Control
                    as="select"
                    name="experience"
                    value={searchCriteria.experience}
                    onChange={handleSearchChange}
                  >
                    <option value="">Select Experience</option>
                    <option value="0"> No Experience</option>
                    <option value="1"> 1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="> 2 ">More than 2 Years</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="searchJobTitle">
                  <Form.Label><i className="bi bi-tag"></i> Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by job title"
                    name="jobTitle"
                    value={searchCriteria.jobTitle}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
                <Form.Group controlId="searchSkills">
                  <Form.Label><i className="bi bi-star"></i> Skills</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by skills"
                    name="skills"
                    value={searchCriteria.skills}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
                <Row>'                                           </Row>
                <Button variant="primary" onClick={applyFilters}>
                  <i className="bi bi-filter"></i> Apply Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card.Footer className="text-center">
    <img src={footerImage} alt="Footer" className="footer-image" />
  </Card.Footer>
        </Col>
        <Col md={9} className="results-column">
          <Row className="justify-content-center">
            {filteredUsers.map((user) => (
              <Col md={6} className="mb-4" key={user.id}>
                <Card className="resume-card">
                  <Card.Body>
                    <Row>
                      <Col md={4} className="resume-left-column">
                        <div className="resume-header">
                          <img src={user.image || '/default-profile.png'} alt="Profile" className="resume-image" />
                          <h2 className="resume-name">{user.firstName} {user.lastName}</h2>
                          <p className="resume-job-title">{user.job_title}</p>
                          <p className="resume-location">{user.location}</p>
                        </div>
                      </Col>
                      <Col md={8} className="resume-right-column">
                        <div className="resume-content">
                          <h4 className="resume-section-title">Skills</h4>
                          <div className="resume-section-divider"></div>
                          <ul>
                            {Array.isArray(user.skills) && user.skills.length > 0 ? user.skills.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            )) : <li>{user.skills}</li>}
                          </ul>
                          <h4 className="resume-section-title">Experience</h4>
                          <div className="resume-section-divider"></div>
                          <ul>
                            {Array.isArray(user.experience) && user.experience.length > 0 ? user.experience.map((exp, index) => (
                              <li key={index}>
                                <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.year})
                              </li>
                            )) : <li>{user.experience}</li>}
                          </ul>
                          <h4 className="resume-section-title">Education</h4>
                          <div className="resume-section-divider"></div>
                          <ul>
                            {Array.isArray(user.education) && user.education.length > 0 ? user.education.map((edu, index) => (
                              <li key={index}>
                                <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
                              </li>
                            )) : <li>{user.education}</li>}
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default CVSearchPage;
