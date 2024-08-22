import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Button, Modal, Spinner, Form } from 'react-bootstrap';
import { FaEye, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaClipboardList, FaIndustry, FaBook, FaUser, FaMapPin } from 'react-icons/fa';

const UserApplicationsPage = () => {
  const { userId } = useParams();
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobTitles, setJobTitles] = useState({});
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3020/api/applications/user/${userId}`)
      .then(response => {
        const applicationsData = response.data;
        setApplications(applicationsData);

        const jobIds = applicationsData.map(app => app.jobId);
        Promise.all(jobIds.map(jobId =>
          axios.get(`http://localhost:3020/api/jobs/${jobId}`)
        ))
        .then(responses => {
          const jobTitlesData = {};
          responses.forEach(response => {
            const job = response.data;
            jobTitlesData[job.id] = job.title;
          });
          setJobTitles(jobTitlesData);
        })
        .catch(error => console.error('Error fetching job titles', error));
      })
      .catch(error => console.error('Error fetching user applications', error));
  }, [userId]);

  const handleShowModal = (jobId) => {
    setLoading(true);
    axios.get(`http://localhost:3020/api/jobs/${jobId}`)
      .then(response => {
        setSelectedJob(response.data);
        setShowModal(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job details', error);
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleStatusChange = (applicationId, status) => {
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [applicationId]: status
    }));

    axios.patch(`http://localhost:3020/api/applications/${applicationId}`, { status })
      .then(response => {
        console.log('Status updated successfully');
      })
      .catch(error => {
        console.error('Error updating status', error);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>
        User Applications
      </h1>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Application Date</th>
            <th>Job Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.jobId}</td>
              <td>{jobTitles[application.jobId]}</td>
              <td>
                <span className={`badge bg-${getStatusBadge(statuses[application.id] || application.status)}`}>
                  {statuses[application.id] || application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </td>
              <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
              <td>
                <Button 
                  variant="info" 
                  onClick={() => handleShowModal(application.jobId)}
                >
                  <FaEye className="me-2" /> View Details
                </Button>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <Form.Check 
                    type="radio" 
                    name={`status-${application.id}`} 
                    id={`in-progress-${application.id}`} 
                    label="In Progress" 
                    checked={statuses[application.id] === 'in-progress'} 
                    onChange={() => handleStatusChange(application.id, 'in-progress')} 
                    className="mb-2"
                  />
                  <Form.Check 
                    type="radio" 
                    name={`status-${application.id}`} 
                    id={`validated-${application.id}`} 
                    label="Validated" 
                    checked={statuses[application.id] === 'validated'} 
                    onChange={() => handleStatusChange(application.id, 'validated')} 
                    className="mb-2"
                  />
                  <Form.Check 
                    type="radio" 
                    name={`status-${application.id}`} 
                    id={`rejected-${application.id}`} 
                    label="Rejected" 
                    checked={statuses[application.id] === 'rejected'} 
                    onChange={() => handleStatusChange(application.id, 'rejected')} 
                    className="mb-2"
                  />
                  <Form.Check 
                    type="radio" 
                    name={`status-${application.id}`} 
                    id={`interviewed-${application.id}`} 
                    label="Interviewed" 
                    checked={statuses[application.id] === 'interviewed'} 
                    onChange={() => handleStatusChange(application.id, 'interviewed')} 
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">{selectedJob?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <FaBriefcase className="me-2 text-primary" />
                  <strong className="me-2">Company:</strong> {selectedJob?.company}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong className="me-2">Location:</strong> {selectedJob?.location}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaClipboardList className="me-2 text-primary" />
                  <strong className="me-2">Type:</strong> {selectedJob?.employmentType}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaDollarSign className="me-2 text-primary" />
                  <strong className="me-2">Salary Range:</strong> {selectedJob?.salaryRange}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaClipboardList className="me-2 text-primary" />
                  <strong className="me-2">Vacancies:</strong> {selectedJob?.vacancies}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaIndustry className="me-2 text-primary" />
                  <strong className="me-2">Industry:</strong> {selectedJob?.industry}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaBook className="me-2 text-primary" />
                  <strong className="me-2">Requirements:</strong> {selectedJob?.requirements}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaUser className="me-2 text-primary" />
                  <strong className="me-2">Experience:</strong> {selectedJob?.experience}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaBook className="me-2 text-primary" />
                  <strong className="me-2">Education:</strong> {selectedJob?.education}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaMapPin className="me-2 text-primary" />
                  <strong className="me-2">Gender:</strong> {selectedJob?.gender}
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaMapPin className="me-2 text-primary" />
                  <strong className="me-2">Major:</strong> {selectedJob?.major}
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'validated':
      return 'success'; 
    case 'in-progress':
      return 'primary'; 
    case 'interviewed':
      return 'info'; 
    default:
      return 'secondary';
  }
};

export default UserApplicationsPage;
