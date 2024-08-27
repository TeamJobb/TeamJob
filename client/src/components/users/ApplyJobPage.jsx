// src/pages/ApplyJobPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
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
      <ApplyForm onApply={handleApply} />
    </div>
  );
};

export default ApplyJobPage;
