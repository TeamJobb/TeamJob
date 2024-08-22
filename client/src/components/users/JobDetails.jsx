import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

const jobs = [
  {
    id: 1,
    title: 'Cyber Security Specialist',
    company: 'Carrington Recruitment Solutions',
    location: 'Devonshire Square, London EC2M 4YF, UK',
    type: 'Hybrid Full Time',
    salary: '£70,000 to £78,000 Annually',
    benefits: 'Good benefits',
    reference: 'EMC/1535',
    description: 'Detailed job description here...'
  },
  {
    id: 2,
    title: 'Marketing',
    company: 'Carrington Recruitment Solutions',
    location: 'Devonshire Square, London EC2M 4YF, UK',
    type: 'Hybrid Full Time',
    salary: '£70,000 to £78,000 Annually',
    benefits: 'Good benefits',
    reference: 'EMC/1535',
    description: 'Detailed job description here...'
  },
  {
    id: 3,
    title: 'Banking',
    company: 'Carrington Recruitment Solutions',
    location: 'Devonshire Square, London EC2M 4YF, UK',
    type: 'Hybrid Full Time',
    salary: '£70,000 to £78,000 Annually',
    benefits: 'Good benefits',
    reference: 'EMC/1535',
    description: 'Detailed job description here...'
  },
  {
    id: 4,
    title: 'IT',
    company: 'Carrington Recruitment Solutions',
    location: 'Devonshire Square, London EC2M 4YF, UK',
    type: 'Hybrid Full Time',
    salary: '£70,000 to £78,000 Annually',
    benefits: 'Good benefits',
    reference: 'EMC/1535',
    description: 'Detailed job description here...'
  },
  // Add more jobs as needed
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleApplyClick = () => {
    navigate(`/apply/${job.id}`);
  };

  return (
    <div className="container">
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
              <Card.Text><strong>Location:</strong> {job.location}</Card.Text>
              <Card.Text><strong>Type:</strong> {job.type}</Card.Text>
              <Card.Text><strong>Salary:</strong> {job.salary}</Card.Text>
              <Card.Text><strong>Benefits:</strong> {job.benefits}</Card.Text>
              <Card.Text><strong>Reference:</strong> {job.reference}</Card.Text>
              <Card.Text>{job.description}</Card.Text>
              <Button variant="primary" onClick={handleApplyClick}>
                Apply to this job
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobDetails;
