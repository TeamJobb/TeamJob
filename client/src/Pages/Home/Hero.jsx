import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchSection from '../../components/SearchSection';
import MapComponent from '../../components/MapComponent';
import { Modal, Button, Spinner, ListGroup, Pagination, Dropdown, FormControl ,Form} from 'react-bootstrap';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaIndustry, FaClipboardList, FaBook, FaUser, FaMapPin } from 'react-icons/fa';



const Home = () => {
  const navigate = useNavigate(); 
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // List of available locations for filtering
  const availableLocations = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Boston','Tunisie'];

  // Filter state
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3020/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (searchLocation) => {
    setLocation(searchLocation);
    const filtered = jobs.filter(job => job.jobLocation.toLowerCase().includes(searchLocation.toLowerCase()));
    setFilteredJobs(filtered);
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

  // Handle filter by selected locations
  const handleLocationFilterChange = (location) => {
    let updatedLocations = [...selectedLocations];
    if (updatedLocations.includes(location)) {
      updatedLocations = updatedLocations.filter((loc) => loc !== location);
    } else {
      updatedLocations.push(location);
    }
    setSelectedLocations(updatedLocations);

    if (updatedLocations.length === 0) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        updatedLocations.some((loc) => job.jobLocation.toLowerCase().includes(loc.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter available locations based on search input
  const filteredLocations = availableLocations.filter(location =>
    location.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <SearchSection onSearch={handleSearch} />

      <div className="job-section" style={{ display: 'flex', marginTop: '30px' }}>
        {/* Filter Section */}
        <div className="filter-section" style={{ width: '25%', padding: '20px', borderRight: '1px solid #ddd' }}>
          <h4 style={{ color: '#0d6efd' }}>Filter by Location</h4>
          <Dropdown >
          <Dropdown.Toggle
         style={{ width: '200px', backgroundColor: 'white', borderColor: 'black' , color: 'black'}}
  
        id="dropdown-custom-components"
         >
       Select Locations
        </Dropdown.Toggle>

          
           

            <Dropdown.Menu>
              <FormControl
                autoFocus
                placeholder="Enter keyword"
                onChange={handleInputChange}
                value={searchInput}
              />
              {filteredLocations.map((location, index) => (
                <Dropdown.Item
                  key={index}
                  as="button"
                  onClick={() => handleLocationFilterChange(location)}
                >
                  <Form.Check
                    type="checkbox"
                    label={location}
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationFilterChange(location)}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

        </div>

        {/* Job List Section */}
        <div style={{ width: '60%', padding: '20px' }}>
          <h2 style={{ color: '#0d6efd', marginBottom: '20px' }}>Find the Job You Love</h2>
          <ListGroup>
            {currentJobs.map((job) => (
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
      </div>
      
      <Banner />
      <div className="map-container" style={{ marginTop: '20px', width: '50%', height: '300px', margin: '0 auto' }}>
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
                <FaIndustry className="me-2 text-primary" />
                <strong>Industry:</strong> {selectedJob?.jobIndustry}
              </div>
              <div className="detail-item mb-3">
                <FaBook className="me-2 text-primary" />
                <strong>Requirements:</strong> {selectedJob?.requirements}
              </div>
              <div className="detail-item mb-3">
                <FaUser className="me-2 text-primary" />
                <strong>Contact Person:</strong> {selectedJob?.contactPerson}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleApplyClick(selectedJob?.id)}>
                Apply Now
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Home;
