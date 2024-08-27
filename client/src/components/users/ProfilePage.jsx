import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css'
import testImage from '../../assets/user-profile default.png'; 
import Imageskillstest from '../../assets/learnImage.jpg'



ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:3022/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleEdit = (field) => {
    if (user) {
      setEditField(field);
      setEditValue(user[field] || '');
      setShowEditModal(true);
    }
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const calculateProfileCompletion = (userData) => {
    let completeness = 0;
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'job_title', 'skills', 'experience', 'education'];
    fields.forEach(field => {
      if (userData[field]) completeness += 10; 
    });
    return completeness;
  };

  const profileCompletion = user ? calculateProfileCompletion(user) : 0;

  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [profileCompletion, 100 - profileCompletion],
        backgroundColor: ['#f84343', '#64f55f'],
        borderWidth: 1,
      },
    ],
  };

  const handleSaveEdit = async () => {
    if (editField && user) {
      try {
        await axios.put(`http://localhost:3022/api/users/${id}`, {
          [editField]: editValue
        });
        setUser({ ...user, [editField]: editValue });
        setShowEditModal(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4">
          <Card className="profile-card shadow-lg border-0 mb-4">
            <Card.Body className="text-center">
              <img
                src={user.image || testImage}
                alt="Profile"
                className="rounded-circle img-fluid mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h5 className="card-title">
                <FontAwesomeIcon 
                  icon={faEdit} 
                  className="me-2 text-primary cursor-pointer"
                  onClick={() => handleEdit('firstName')}
                  style={{ fontSize: '1.2rem' }}
                />
                {user.firstName} 
                <FontAwesomeIcon 
                  icon={faEdit} 
                  className="ms-2 text-primary cursor-pointer"
                  onClick={() => handleEdit('lastName')}
                  style={{ fontSize: '1.2rem' }}
                />
                {user.lastName}
              </h5>
              <p className="card-text text-muted">{user.job_title || 'Job Title Not Provided'}</p>
              <p className="card-text text-muted mb-4">{user.location || 'Location Not Provided'}</p>
            </Card.Body>
          </Card>

          <Card className="profile-completeness-card shadow-lg border-0 mb-4 rounded-lg">
  <Card.Body className="p-4">
    <h5 className="card-title mb-3 text-primary">Improve Your Profile</h5>
    <div className="profile-completeness-chart mb-3">
      <Pie data={chartData} />
    </div>
    <div className={`completeness-text mb-2 ${profileCompletion >= 80 ? 'green' : 'red'}`}>
      <span>{profileCompletion}%</span> Complete
    </div>
    <p className="text-secondary">
      Reach a profile strength of 80% to be in the top 10% of highly visible users.
    </p>
   
  </Card.Body>
</Card>

          <Card className="profile-card shadow-lg border-0 mb-4">
            <Card.Body>
              <h5 className="card-title"></h5>
              <div className="mb-3">
                <h6 className="fw-bold">GitHub</h6>
                <a href={user.github || '#'} className="text-decoration-none">
                  <FontAwesomeIcon icon={faGithub} /> {user.github || 'Not Provided'}
                </a>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Twitter</h6>
                <a href={user.twitter || '#'} className="text-decoration-none">
                  <FontAwesomeIcon icon={faTwitter} /> {user.twitter || 'Not Provided'}
                </a>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Instagram</h6>
                <a href={user.instagram || '#'} className="text-decoration-none">
                  <FontAwesomeIcon icon={faInstagram} /> {user.instagram || 'Not Provided'}
                </a>
              </div>
              <div className="mb-3">
                <h6 className="fw-bold">Facebook</h6>
                <a href={user.facebook || '#'} className="text-decoration-none">
                  <FontAwesomeIcon icon={faFacebookF} /> {user.facebook || 'Not Provided'}
                </a>
              </div>
            </Card.Body>
          </Card>
          
        </div>

        <div className="col-lg-8">
          <Card className="profile-info-card mb-4">
            <Card.Body>
              <h5 className="card-title">PERSONAL INFORMATION</h5>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Email:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.email || 'Email Not Provided'}</span>
                </h6>
                <Button 
                  variant="link" 
                  onClick={() => handleEdit('email')}
                >
                  <FontAwesomeIcon className="edit-icon" icon={faEdit} /> Edit
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Phone:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.phone || 'Phone Not Provided'}</span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('phone')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Address:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.address || 'Address Not Provided'} </span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('address')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="profile-info-card mb-4">
            <Card.Body>
              <h5 className="card-title">PROFESSIONAL INFORMATION</h5>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Job Title:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.job_title || 'Job Title Not Provided'} </span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('job_title')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Skills:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.skills || 'Skills Not Provided'} </span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('skills')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Experience:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.experience || 'Experience Not Provided'} </span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('experience')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="editable-info" style={{ fontWeight: 'bold' }}>Education:   
                  <span style={{ fontWeight: 'normal', marginLeft: '0.5rem' }}> {user.education || 'Education Not Provided'} </span>
                </h6>
                <Button 
                  variant="link"
                  onClick={() => handleEdit('education')}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="profile-info-card mb-4">
            <Card.Body>
              <div className="d-flex align-items-center">
                <img src={Imageskillstest} alt="Skill Assessment" className="img-fluid" style={{ width: '200px', height: 'auto', marginRight: '20px' }} />
                <div>
                  <h5 className="card-title">Take a Skill Assessment Test</h5>
                  <p className="card-text">Click the button below to start a skill assessment test to showcase your skills.</p>
                  <Button variant="primary" onClick={() => window.open('https://www.coursera.org', '_blank')}>
                    Take Test
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="profile-info-card mb-4">
            <div className="card-body text-center">
              <h3 className="my-4">The Online Resume Builder You Deserve</h3>
              <p>Creating a Professional Resume and Cover Letter Has Never Been So Easy</p>
              <Button variant="primary" onClick={() => window.location.href = 'https://resume.io/resume-templates'}>
                Get Started for Free
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField ? editField.charAt(0).toUpperCase() + editField.slice(1) : 'Field'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formEditValue">
            <Form.Label>{editField ? editField.charAt(0).toUpperCase() + editField.slice(1) : 'Field'}</Form.Label>
            <Form.Control
              type="text"
              value={editValue}
              onChange={handleEditChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;