import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditJobModal = ({ show, onHide, job, onJobUpdated }) => {
  const [jobDetails, setJobDetails] = useState(job);

  useEffect(() => {
    setJobDetails(job);
  }, [job]);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3022/api/jobs/${jobDetails.id}`, jobDetails);
      onJobUpdated(response.data.job);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={jobDetails.company}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="salaryRange">
            <Form.Label>Salary Range</Form.Label>
            <Form.Control
              type="text"
              name="salaryRange"
              value={jobDetails.salaryRange}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="vacancies">
            <Form.Label>Vacancies</Form.Label>
            <Form.Control
              type="number"
              name="vacancies"
              value={jobDetails.vacancies}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="employmentType">
            <Form.Label>Employment Type</Form.Label>
            <Form.Control
              type="text"
              name="employmentType"
              value={jobDetails.employmentType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="jobLocation">
            <Form.Label>Job Location</Form.Label>
            <Form.Control
              type="text"
              name="jobLocation"
              value={jobDetails.jobLocation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="jobIndustry">
            <Form.Label>Job Industry</Form.Label>
            <Form.Control
              type="text"
              name="jobIndustry"
              value={jobDetails.jobIndustry}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="requirements">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="requirements"
              value={jobDetails.requirements}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={jobDetails.age}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="experience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={jobDetails.experience}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="nationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              value={jobDetails.nationality}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="education">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={jobDetails.education}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={jobDetails.gender}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="residenceLocation">
            <Form.Label>Residence Location</Form.Label>
            <Form.Control
              type="text"
              name="residenceLocation"
              value={jobDetails.residenceLocation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="major">
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="text"
              name="major"
              value={jobDetails.major}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="careerLevel">
            <Form.Label>Career Level</Form.Label>
            <Form.Control
              type="text"
              name="careerLevel"
              value={jobDetails.careerLevel}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">Update Job</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobModal;
