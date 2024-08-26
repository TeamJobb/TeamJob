import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, InputGroup, Table, Modal, Pagination } from 'react-bootstrap';
import { Search, PlusCircle, Pencil, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MyWorkSpace.css';

// Importez vos images
import jobPostingImage from '../../assets/job-post.jpg';
import searchResumeImage from '../../assets/find.png';
import additionalInfoImage from '../../assets/footercvsearch - Copie.jpg';


const Workspace = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showJobsModal, setShowJobsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3020/api/jobs');
      setJobs(response.data);
    } catch (error) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setJobTitle(job.title);
    setJobDescription(job.description);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:3020/api/jobs/${id}`);
        fetchJobs();
      } catch (error) {
        setError('Failed to delete job');
      }
    }
  };

  const handleUpdateJob = async () => {
    try {
      await axios.put(`http://localhost:3020/api/jobs/${selectedJob.id}`, {
        title: jobTitle,
        description: jobDescription,
      });
      setShowEditModal(false);
      fetchJobs();
    } catch (error) {
      setError('Failed to update job');
    }
  };

  // Navigation function
  const handleNavigateToCVSearch = () => {
    navigate('/cv-search'); // Change to your CV-Search route
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="workspace-title">Welcome to Your Workspace!</h2>
          <p className="workspace-subtitle">Manage your job postings and find qualified candidates with ease.</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} lg={4} className="mb-4">
          <Card className="workspace-card border-primary shadow-sm">
            <Card.Img variant="top" src={jobPostingImage} className="workspace-card-img" />
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <PlusCircle className="me-2 workspace-icon" /> Manage Your Job Postings
              </Card.Title>
              <Card.Text>
                Quickly access and review your recent job postings. Keep track of your active listings and update them as needed.
              </Card.Text>
              <Button variant="primary" onClick={() => setShowJobsModal(true)} className="workspace-button">
                View All Post-Job
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card className="workspace-card border-success shadow-sm">
            <Card.Img variant="top" src={searchResumeImage} className="workspace-card-img" />
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <Search className="me-2 workspace-icon" /> Search Resumes
              </Card.Title>
              <Card.Text>
                Use the search form below to find resumes that match your criteria. Filter by keyword, skill, or location to find the best candidates.
              </Card.Text>
              <Form>
                <Form.Group controlId="searchResume">
                  <InputGroup>
                    <Button variant="outline-primary" type="button" onClick={handleNavigateToCVSearch} className="workspace-button">
                      <Search /> Search
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={4} className="mb-4">
          <Card className="workspace-card border-info shadow-sm">
            <Card.Img variant="top" src={additionalInfoImage} className="workspace-card-img" />
            <Card.Body>
              <Card.Title>Additional Information</Card.Title>
              <Card.Text>
                View company performance metrics, upcoming interviews, and more insights to help you manage your recruitment effectively.
              </Card.Text>
              <Button variant="primary" className="workspace-button">
                Contact Us
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Display all jobs modal */}
      <Modal show={showJobsModal} onHide={() => setShowJobsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Job Postings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => handleEdit(job)}
                          className="me-2"
                          title="Edit Job"
                        >
                          <Pencil /> Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(job.id)}
                          title="Delete Job"
                        >
                          <Trash /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="justify-content-center">
                {[...Array(Math.ceil(jobs.length / jobsPerPage)).keys()].map(num => (
                  <Pagination.Item key={num + 1} onClick={() => paginate(num + 1)} active={num + 1 === currentPage}>
                    {num + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJobsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit job modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title"
              />
            </Form.Group>
            <Form.Group controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateJob}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Workspace;