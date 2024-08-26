import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './FriendRequestCard.css';

// Import images from assets
import aliceImage from '../../assets/customer-3.jpg';
import bobImage from '../../assets/customer-2.jpg';
import charlieImage from '../../assets/customer-1.jpg';

// Ex
const friendRequests = [
    { id: 1, name: 'Alice Johnson', imageUrl: aliceImage, description: 'Wants to connect with you, Compliance officer' },
    { id: 2, name: 'Bob Smith', imageUrl: bobImage, description: 'Wants to connect with you, Senior Data Science ' },
    { id: 3, name: 'Charlie Brown', imageUrl: charlieImage, description: 'Wants to connect with you, Junior Regulatory Report ' },
  ];
  
  const FriendRequestCard = () => {
    return (
      <div className="friend-requests-container">
        {friendRequests.map((request) => (
          <Card key={request.id} style={{ width: '18rem' }} className="mb-3 friend-request-card">
            <Card.Img variant="top" src={request.imageUrl} alt={request.name} />
            <Card.Body>
              <Card.Title>{request.name}</Card.Title>
              <Card.Text>{request.description}</Card.Text>
              <Button variant="primary" className="me-2">Accept</Button>
              <Button variant="danger">Reject</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };
  
  export default FriendRequestCard;