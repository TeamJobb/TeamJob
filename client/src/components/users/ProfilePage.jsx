////////updated done

import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Button, Form, Row, Col, Card } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css'
import FriendRequests from './FriendRequestCard.jsx';
import testImage from '../../assets/user-profile default.png'; 
import learnImage from '../../assets/learnImage.jpg'

const ProfilePage = ({ onNewMessage }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState({ submitted: 8, interviewed: 5, validated: 2, rejected: 6 });
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        setError('User ID is missing.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3020/api/users/${id}`);
        setUser(response.data);
        setApplications(response.data.applications || {});
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          setError('Error: No response from server');
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleCompanyChange = (event) => setSelectedCompany(event.target.value);

  const handleSendMessage = () => {
    const newMessage = {
      id: Date.now(),
      company: selectedCompany,
      content: message,
    };
    onNewMessage(newMessage);
    setShowMessageModal(false);
    navigate('/messages');
  };

  const handleGetStartedClick = () => {
    window.location.href = 'https://resume.io/resume-templates';
  };

  const handleCvFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleTakeTestClick = () => {
    window.open('https://www.coursera.org', '_blank');
  };

  const companies = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ];

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info" role="alert">Loading...</div>
      </div>
    );
  }

 

  return (
    <>
      
      <section className="profile-background bg-light py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col">
            <nav aria-label="breadcrumb" className="bg-white rounded p-3 shadow-sm">
  <ol className="breadcrumb mb-0">
    <li className="breadcrumb-item active" aria-current="page">
      Welcome 
      <span 
        style={{ 
          fontWeight: 'bold', 
          color: '#003366', 
          marginLeft: '0.5rem' 
        }}
      >
        {user.firstName} {user.lastName}
      </span>
      , Dive into new opportunities with enthusiasm and uncover the career paths that await !
    </li>
  </ol>
</nav>

            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4 shadow-lg border-0">
                <div className="card-body text-center">
                  <img
                   src={user.image ? user.image : testImage} // Affiche l'image cloudinary
                    alt="Profile"
                    className="rounded-circle img-fluid mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h5 className="card-title text-primary mb-1">{user.firstName} {user.lastName}</h5>
                  <p className="card-text text-muted">{user.job_title || 'Job Title Not Provided'}</p>
                  <p className="card-text text-muted mb-4">{user.location || 'Location Not Provided'}</p>
                  <Button variant="primary" onClick={() => setShowMessageModal(true)}>Message</Button>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Website</span>
                    <p className="mb-0">{user.website || 'Website Not Provided'}</p>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <FontAwesomeIcon icon={faGithub} size="lg" className="text-muted me-2" />
                    <p className="mb-0">{user.github || 'GitHub Not Provided'}</p>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <FontAwesomeIcon icon={faTwitter} size="lg" className="text-info me-2" />
                    <p className="mb-0">{user.twitter || 'Twitter Not Provided'}</p>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <FontAwesomeIcon icon={faInstagram} size="lg" className="text-danger me-2" />
                    <p className="mb-0">{user.instagram || 'Instagram Not Provided'}</p>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <FontAwesomeIcon icon={faFacebookF} size="lg" className="text-primary me-2" />
                    <p className="mb-0">{user.facebook || 'Facebook Not Provided'}</p>
                  </li>
                </ul>
              </div>
              <div className="card mb-4 shadow-lg border-0">
                <div className="card-body text-center">
                  <h3 className="my-4">The Online Resume Builder You Deserve</h3>
                  <p>Creating a Professional Resume and Cover Letter Has Never Been So Easy</p>
                  <Button variant="primary" onClick={handleGetStartedClick}>Get Started for Free</Button>
                </div>
              </div>
              <FriendRequests />
            </div>

            <div className="col-lg-8">
              <div className="card mb-4 shadow-lg border-0">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Education</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.education}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Experience</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.experience}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Skills</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.skills}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-4 shadow-lg border-0">
                <div className="card-body">
                  <h5 className="card-title">My Applications</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title>Submitted Applications</Card.Title>
                          <Card.Text>{applications.submitted || 0}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-6">
                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title>Interviewed</Card.Title>
                          <Card.Text>{applications.interviewed || 0}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title>Validated</Card.Title>
                          <Card.Text>{applications.validated || 0}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-6">
                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title>Rejected</Card.Title>
                          <Card.Text>{applications.rejected || 0}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

{/* Test Card */}
<Card className="mb-4 shadow-lg border-0">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <img src={learnImage} alt="test" className="img-fluid" style={{ width: '200px', height: 'auto', marginRight: '20px' }} />
                    <div>
                      <h5 className="card-title">Take a Skill Assessment Test</h5>
                      <p className="card-text">Click the button below to start a skill assessment test to showcase your skills.</p>
                      <Button variant="primary" onClick={handleTakeTestClick}>Take Test</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Send a Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formCompany">
                      <Form.Label column sm="3">Select Company</Form.Label>
                      <Col sm="9">
                        <Form.Control as="select" value={selectedCompany} onChange={handleCompanyChange}>
                          <option value="">Select a company</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.name}>{company.name}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formMessage">
                      <Form.Label column sm="3">Message</Form.Label>
                      <Col sm="9">
                        <Form.Control as="textarea" rows={3} value={message} onChange={handleMessageChange} />
                      </Col>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowMessageModal(false)}>Close</Button>
                  <Button variant="primary" onClick={handleSendMessage}>Send Message</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;                      
