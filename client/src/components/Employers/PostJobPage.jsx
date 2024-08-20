import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const PostJobForm = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: [],
    salaryRange: '',
    vacancies: '',
    employmentType: '',
    jobLocation: '',
    jobIndustry: '',
    age: '',
    experience: '',
    nationality: '',
    education: '',
    gender: '',
    residenceLocation: '',
    major: '',
    careerLevel: '',
  });

  const [newRequirement, setNewRequirement] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const addRequirement = () => {
    if (newRequirement) {
      setJobDetails({
        ...jobDetails,
        requirements: [...jobDetails.requirements, newRequirement],
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    const updatedRequirements = jobDetails.requirements.filter((_, i) => i !== index);
    setJobDetails({ ...jobDetails, requirements: updatedRequirements });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert array to comma-separated string if backend expects a string
      const formattedJobDetails = {
        ...jobDetails,
        requirements: jobDetails.requirements.join(', ')
      };

      const response = await axios.post('http://localhost:3020/api/jobs', formattedJobDetails);
      if (response.status === 201) {
        alert('Your job post was successfully added');
        navigate('/MyWorkSpace');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4 mb-4 bg-light">
        <Card.Body>
          <h2 className="mb-4">Post a New Job</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="jobTitle" className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group controlId="companyName" className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={jobDetails.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group controlId="salaryRange" className="mb-3">
              <Form.Label>Monthly Salary Range</Form.Label>
              <Form.Control
                as="select"
                name="salaryRange"
                value={jobDetails.salaryRange}
                onChange={handleChange}
                required
              >
                <option value="">Select Salary Range</option>
                <option value="0-1000">0-1000</option>
                <option value="1000-3000">1000-3000</option>
                <option value="3000-5000">3000-5000</option>
                <option value="5000+">5000+</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="vacancies" className="mb-3">
              <Form.Label>Number of Vacancies</Form.Label>
              <Form.Control
                as="select"
                name="vacancies"
                value={jobDetails.vacancies}
                onChange={handleChange}
                required
              >
                <option value="">Select Number of Vacancies</option>
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="5-10">5-10</option>
                <option value="10+">10+</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="employmentType" className="mb-3">
              <Form.Label>Employment Type</Form.Label>
              <Form.Control
                as="select"
                name="employmentType"
                value={jobDetails.employmentType}
                onChange={handleChange}
                required
              >
                <option value="">Select Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="jobLocation" className="mb-3">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                as="select"
                name="jobLocation"
                value={jobDetails.jobLocation}
                onChange={handleChange}
                required
              >
                <option value="">Select Job Location</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Dubai">Dubai</option>
                <option value="Tokyo">Tokyo</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="jobIndustry" className="mb-3">
              <Form.Label>Job Industry</Form.Label>
              <Form.Control
                as="select"
                name="jobIndustry"
                value={jobDetails.jobIndustry}
                onChange={handleChange}
                required
              >
                <option value="">Select Job Industry</option>
                <option value="IT">IT</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="newRequirement" className="mb-3">
              <Form.Label>Add Requirements</Form.Label>
              <Row>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    name="newRequirement"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Enter requirement"
                  />
                </Col>
                <Col md={2}>
                  <Button variant="outline-success" onClick={addRequirement} className="w-100">
                    <i className="bi bi-plus-circle"></i> Add
                  </Button>
                </Col>
              </Row>
              <ul className="list-group mt-2">
                {jobDetails.requirements.map((req, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {req}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={jobDetails.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
              />
            </Form.Group>

            <Form.Group controlId="experience" className="mb-3">
              <Form.Label>Experience (in years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={jobDetails.experience}
                onChange={handleChange}
                placeholder="Enter experience"
                min="0"
              />
            </Form.Group>

            <Form.Group controlId="nationality" className="mb-3">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={jobDetails.nationality}
                onChange={handleChange}
                placeholder="Enter nationality"
              />
            </Form.Group>

            <Form.Group controlId="education" className="mb-3">
              <Form.Label>Minimum Education</Form.Label>
              <Form.Control
                type="text"
                name="education"
                value={jobDetails.education}
                onChange={handleChange}
                placeholder="Enter minimum education"
              />
            </Form.Group>

            <Form.Group controlId="gender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={jobDetails.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="residenceLocation" className="mb-3">
              <Form.Label>Residence Location</Form.Label>
              <Form.Control
                type="text"
                name="residenceLocation"
                value={jobDetails.residenceLocation}
                onChange={handleChange}
                placeholder="Enter residence location"
              />
            </Form.Group>

            <Form.Group controlId="major" className="mb-3">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                name="major"
                value={jobDetails.major}
                onChange={handleChange}
                placeholder="Enter major"
              />
            </Form.Group>

            <Form.Group controlId="careerLevel" className="mb-3">
              <Form.Label>Career Level</Form.Label>
              <Form.Control
                type="text"
                name="careerLevel"
                value={jobDetails.careerLevel}
                onChange={handleChange}
                placeholder="Enter career level"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Post Job
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostJobForm;
