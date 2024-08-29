import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaUser, FaFileUpload, FaFileAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplyForm.css';

const ApplyForm = ({ onApply }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cv: null,
    coverLetter: '',
    jobAlerts: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      cv: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onApply(formData);
      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <div className="form-container p-4 border rounded shadow-sm bg-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white">
                      <FaEnvelope />
                    </span>
                  </div>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    isInvalid={submissionStatus === 'error' && !formData.email}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white">
                      <FaUser />
                    </span>
                  </div>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    isInvalid={submissionStatus === 'error' && !formData.name}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please provide your full name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="cv" className="mb-3">
                <Form.Label>Upload CV</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white">
                      <FaFileUpload />
                    </span>
                  </div>
                  <Form.Control
                    type="file"
                    name="cv"
                    onChange={handleFileChange}
                    required
                    isInvalid={submissionStatus === 'error' && !formData.cv}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please upload your CV.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="coverLetter" className="mb-3">
                <Form.Label>Cover Letter</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white">
                      <FaFileAlt />
                    </span>
                  </div>
                  <Form.Control
                    as="textarea"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Write your cover letter here"
                    isInvalid={submissionStatus === 'error' && !formData.coverLetter}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please provide a cover letter.
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-100"
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Submit Application'
                )}
              </Button>
              {submissionStatus === 'success' && (
                <div className="mt-4 text-success text-center">
                  <FaCheckCircle className="me-2" /> Application submitted successfully!
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="mt-4 text-danger text-center">
                  <FaExclamationTriangle className="me-2" /> An error occurred. Please try again.
                </div>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyForm;
