//Mywork space Done/////////
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import EditJobModal from './EditJobModal.jsx';

const EditJob = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3022/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3022/api/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(job)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(job.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {selectedJob && (
        <EditJobModal
          show={showModal}
          onHide={() => setShowModal(false)}
          job={selectedJob}
          onJobUpdated={(updatedJob) => {
            setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default EditJob;
