// src/pages/ApplyJobPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const ApplyJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3020/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details', error);
        setError('Error fetching job details');
      }
    };

    fetchJob();
  }, [jobId]);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('cv', cvFile);

    try {
      await axios.post(`http://localhost:3020/api/job-applications`, {
        jobId,
        cvFile: formData,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error applying for job', error);
      setError('Error applying for job');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (success) return <Alert variant="success">Application submitted successfully!</Alert>;

  return (
    <div className="container mt-5">
      <h2>Apply for Job</h2>
      {job && (
        <div>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.jobLocation}</p>
          <p>{job.salaryRange}</p>
        </div>
      )}
      <Form onSubmit={handleApply}>
        <Form.Group controlId="formFile">
          <Form.Label>Upload CV or Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit Application</Button>
      </Form>
    </div>
  );
};

export default ApplyJobPage;
