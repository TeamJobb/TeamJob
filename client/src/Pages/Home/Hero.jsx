import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchSection from '../../components/SearchSection.jsx'; 
import MapWithSearch from '../../components/Map/Mapsearch.jsx'; 
import { Modal, Button, Spinner, ListGroup, Pagination } from 'react-bootstrap';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaIndustry, FaBuilding, FaClipboardList, FaCalendarDay, FaFlag, FaGraduationCap, FaGenderless, FaUserTie, FaHome, FaBook, FaUser, FaMapPin } from 'react-icons/fa';
import './Hero.css'; 
import Categorie from '../../components/Categorie.jsx';

const Home = () => {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3022/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };
    fetchJobs();
  }, []);

  // Function to handle search
  const handleSearch = (searchTerm) => {
    const filtered = jobs.filter(
      (job) =>
        (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (job.company?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (job.jobLocation?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleJobClick = async (jobId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3022/api/jobs/${jobId}`);
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
    navigate(`/apply-job/${jobId}`);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchSection onSearch={handleSearch} />

      <div className="content-container">
        <div className="job-section">
          <h1 className="section-title">Find the Job You Love</h1><br></br>
         
          
          <ListGroup>
            {currentJobs.map((job) => (
              <ListGroup.Item
                key={job.id}
                onClick={() => handleJobClick(job.id)}
                style={{ cursor: 'pointer', padding: '20px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #0d6efd', transition: 'background-color 0.3s ease' }}
                className="job-item"
              >
                <h3 style={{ color: '#0d6efd' }}><FaBriefcase /> {job.title}</h3>
                <p style={{ color: '#0a0a0a' }}><FaIndustry /> {job.company}</p>
                <p style={{ color: '#0a0a0a' }}><FaDollarSign /> {job.salaryRange}</p>
                <p style={{ color: '#0a0a0a' }}><FaMapMarkerAlt /> {job.jobLocation}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>


          <div className="d-flex justify-content-center mt-4">
            <Pagination style={{ marginTop: '20px' }}>
              <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage - 1)} />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => currentPage < totalPages && paginate(currentPage + 1)} />
            </Pagination>
          </div>
        </div>
      

        <div className="map-section">
         <br></br> <h1  style={{ color: '#0d6efd' }} className="section-title"> Search For Job Locations Here</h1><br></br>
          <MapWithSearch zoom={13} />
        </div>
      </div>

      <Banner />
      <div className="map-container" style={{ marginTop: '20px', width: '50%', height: '300px', margin: '0 auto' }}>
       
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
                 <strong>Job Title:</strong> {selectedJob?.title}
               </div>
               <div className="detail-item mb-3">
                 <FaBuilding className="me-2 text-primary" />
                 <strong>Company:</strong> {selectedJob?.company}
               </div>
               <div className="detail-item mb-3">
                 <FaMapMarkerAlt className="me-2 text-primary" />
                 <strong>Location:</strong> {selectedJob?.jobLocation}
               </div>
               <div className="detail-item mb-3">
                 <FaClipboardList className="me-2 text-primary" />
                 <strong>Type:</strong> {selectedJob?.employmentType}
               </div>
               <div className="detail-item mb-3">
                 <FaDollarSign className="me-2 text-primary" />
                 <strong>Salary Range:</strong> {selectedJob?.salaryRange}
               </div>
               <div className="detail-item mb-3">
                 <FaClipboardList className="me-2 text-primary" />
                 <strong>Vacancies:</strong> {selectedJob?.vacancies}
               </div>
               <div className="detail-item mb-3">
                 <FaCalendarDay className="me-2 text-primary" />
                 <strong>Date Posted:</strong> {selectedJob?.datePosted}
               </div>
               <div className="detail-item mb-3">
                 <FaFlag className="me-2 text-primary" />
                 <strong>Nationality:</strong> {selectedJob?.nationality}
               </div>
               <div className="detail-item mb-3">
                 <FaGraduationCap className="me-2 text-primary" />
                 <strong>Education:</strong> {selectedJob?.education}
               </div>
               <div className="detail-item mb-3">
                 <FaGenderless className="me-2 text-primary" />
                 <strong>Gender:</strong> {selectedJob?.gender}
               </div>
               <div className="detail-item mb-3">
                 <FaUserTie className="me-2 text-primary" />
                 <strong>Experience:</strong> {selectedJob?.experience}
               </div>
               <div className="detail-item mb-3">
                 <FaHome className="me-2 text-primary" />
                 <strong>Residence Location:</strong> {selectedJob?.residenceLocation}
               </div>
               <div className="detail-item mb-3">
                 <FaBook className="me-2 text-primary" />
                 <strong>Major:</strong> {selectedJob?.major}
               </div>
               <div className="detail-item mb-3">
                 <FaUser className="me-2 text-primary" />
                 <strong>Career Level:</strong> {selectedJob?.careerLevel}
               </div>
               <div className="detail-item mb-3">
                 <FaMapPin className="me-2 text-primary" />
                 <strong>Job Industry:</strong> {selectedJob?.jobIndustry}
               </div>
               <div className="detail-item mb-3">
                 <FaMapPin className="me-2 text-primary" />
                 <strong>Requirements:</strong> {selectedJob?.requirements}
               </div>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleCloseModal}>
                 Close
               </Button>
               <Button variant="primary" onClick={() => handleApplyClick(selectedJob?.id)}>
                 Apply
               </Button>
             </Modal.Footer>
           </>
         )}
       </Modal>
      <Categorie />
    </div>
  );
};

export default Home;
