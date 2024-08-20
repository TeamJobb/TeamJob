import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchSection from '../../components/SearchSection'; 
import MapComponent from '../../components/MapComponent'; 
import { Modal, Button, Spinner, ListGroup, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaIndustry, FaClipboardList, FaBook, FaUser, FaMapPin } from 'react-icons/fa';


const Home = () => {
  const navigate = useNavigate(); // Initialiser le hook useNavigate
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3020/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (searchLocation) => {
    setLocation(searchLocation);
  };

  const handleJobClick = async (jobId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3020/api/jobs/${jobId}`);
      setSelectedJob(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching job details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleApplyClick = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <SearchSection onSearch={handleSearch} />
      <div className="job-section" style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#0d6efd', marginBottom: '20px' }}>Find the Job You Love</h2>
        <ListGroup>
          {currentJobs.map(job => (
            <ListGroup.Item 
              key={job.id} 
              onClick={() => handleJobClick(job.id)} 
              style={{ cursor: 'pointer', padding: '20px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #0d6efd', transition: 'background-color 0.3s ease' }}
              className="job-item"
            >
              <h3 style={{ color: '#0d6efd' }}><FaBriefcase /> {job.title}</h3>
              <p><FaIndustry /> {job.company}</p>
              <p><FaDollarSign /> {job.salaryRange}</p>
              <p><FaMapMarkerAlt /> {job.jobLocation}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Pagination Controls */}
        <Pagination style={{ marginTop: '20px' }}>
          <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage - 1)} />
          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => currentPage < totalPages && paginate(currentPage + 1)} />
        </Pagination>
      </div>
      <Banner />
      <div className="map-container" style={{ marginTop: '20px' }}>
        <MapComponent location={location} zoom={13} />
      </div>

      {/* Job Details Modal */}
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
              <div className="detail-item mb-3">
                <FaBriefcase className="me-2 text-primary" />
                <strong>Company:</strong> {selectedJob?.company}
              </div>
              <div className="detail-item mb-3">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <strong>Location:</strong> {selectedJob?.jobLocation}
              </div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="type-tooltip">Type of employment</Tooltip>}
              >
                <div className="detail-item mb-3">
                  <FaClipboardList className="me-2 text-primary" />
                  <strong>Type:</strong> {selectedJob?.employmentType}
                </div>
              </OverlayTrigger>
              <div className="detail-item mb-3">
                <FaDollarSign className="me-2 text-primary" />
                <strong>Salary Range:</strong> {selectedJob?.salaryRange}
              </div>
              <div className="detail-item mb-3">
                <FaClipboardList className="me-2 text-primary" />
                <strong>Vacancies:</strong> {selectedJob?.vacancies}
              </div>
              <div className="detail-item mb-3">
                <FaIndustry className="me-2 text-primary" />
                <strong>Industry:</strong> {selectedJob?.jobIndustry}
              </div>
              <div className="detail-item mb-3">
                <FaBook className="me-2 text-primary" />
                <strong>Requirements:</strong> {selectedJob?.requirements}
              </div>
              <div className="detail-item mb-3">
                <FaUser className="me-2 text-primary" />
                <strong>Experience:</strong> {selectedJob?.experience}
              </div>
              <div className="detail-item mb-3">
                <FaBook className="me-2 text-primary" />
                <strong>Education:</strong> {selectedJob?.education}
              </div>
              <div className="detail-item mb-3">
                <FaMapPin className="me-2 text-primary" />
                <strong>Gender:</strong> {selectedJob?.gender}
              </div>
              <div className="detail-item mb-3">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <strong>Residence Location:</strong> {selectedJob?.residenceLocation}
              </div>
              <div className="detail-item mb-3">
                <FaMapPin className="me-2 text-primary" />
                <strong>Major:</strong> {selectedJob?.major}
              </div>
              <div className="detail-item mb-3">
                <FaMapPin className="me-2 text-primary" />
                <strong>Career Level:</strong> {selectedJob?.careerLevel}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleApplyClick(selectedJob?.id)}>
                Apply to this job
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Home;