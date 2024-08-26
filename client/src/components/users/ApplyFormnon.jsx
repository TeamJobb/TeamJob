import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cv: null,
    coverLetter: '',
    jobAlerts: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div className="container">
      <Row className="mt-4">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name and Last Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cv">
              <Form.Label>Upload CV</Form.Label>
              <Form.Control
                type="file"
                name="cv"
                onChange={(e) => setFormData(prevState => ({ ...prevState, cv: e.target.files[0] }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="coverLetter">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="jobAlerts">
              <Form.Check
                type="checkbox"
                name="jobAlerts"
                label="Send me similar jobs via email"
                checked={formData.jobAlerts}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ApplyForm;
