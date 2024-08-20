// src/components/Applications.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Spinner, Alert, Card } from 'react-bootstrap';
import { useUserContext } from '../users/UserContext.jsx'; // Adjust the path if needed

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUserContext(); // Access user from context
    const userId = user?.id; // Adjust based on how userId is stored

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3020/api/job-applications/user/${UserId}`);
                setApplications(response.data);
            } catch (err) {
                setError('Failed to load applications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) { // Check if userId is available
            fetchApplications();
        } else {
            setError('User not logged in.');
            setLoading(false);
        }
    }, [userId]); // Add userId to dependency array

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Submitted Applications</h2>
            {applications.length > 0 ? (
                <ListGroup>
                    {applications.map(app => (
                        <ListGroup.Item key={app.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{app.jobTitle}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Company: {app.company}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Submission Date:</strong> {new Date(app.submissionDate).toLocaleDateString()}
                                    </Card.Text>
                                    {/* Add other relevant details */}
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Alert variant="info">No applications found.</Alert>
            )}
        </div>
    );
};

export default Applications;
