// src/pages/ApplyJobPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import ApplyForm from './ApplyForm.jsx'; 
import { UserContext } from '../users/UserContext.jsx';

const ApplyJobPage = () => {
  const { jobId } = useParams();
  const { user } = useContext(UserContext);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3022/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details', error);
        setError('Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = async (formData) => {
    if (!user) {
      setError('You must be logged in to apply');
      return;
    }
    
    setLoading(true);
    try {
      const applicationData = {
        userId: user.id,
        jobId,
        ...formData,
      };
      await axios.post(`http://localhost:3022/api/applications`, applicationData);
      setSuccess(true);
    } catch (error) {
      console.error('Error applying for job', error);
      setError('Error applying for job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : success ? (
        <Alert variant="success">Application submitted successfully!</Alert>
      ) : (
        <Row>
          <Col md={12} lg={8} className="mx-auto">
          <div className="p-4 border rounded shadow-sm bg-white text-center">
              <h2 className="text-primary mb-4">Apply for Job</h2>
              {job && (
                <div className="mb-4 text-blue">
                  <h3 className="text-primary">{job.title}</h3>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.jobLocation}</p>
                  <p><strong>Salary Range:</strong> {job.salaryRange}</p>
                </div>
              )}
              <ApplyForm onApply={handleApply} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ApplyJobPage;
