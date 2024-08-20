import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'emploi à partir des paramètres de l'URL
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cv: null,
    coverLetter: '',
    jobAlerts: false
  });
  const [showSuccess, setShowSuccess] = useState(false); // État pour afficher le message de succès
  const [showError, setShowError] = useState(false); // État pour afficher le message d'erreur

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Remplacez ceci par la logique pour soumettre le formulaire, par exemple, une requête API.
      // Exemple :
      // await submitApplication(formData);
      
      setShowSuccess(true); // Affiche le message de succès
      setFormData({
        email: '',
        name: '',
        cv: null,
        coverLetter: '',
        jobAlerts: false
      }); // Réinitialise le formulaire
      setShowError(false); // Réinitialise l'état d'erreur
    } catch (error) {
      setShowError(true); // Affiche le message d'erreur en cas de problème
      setShowSuccess(false); // Réinitialise l'état de succès
    }
  };

  return (
    <div className="container">
      <h2>Apply for Job {id}</h2>
      <Row className="mt-4">
        <Col md={8}>
          {showSuccess && <Alert variant="success">Your application has been submitted successfully!</Alert>}
          {showError && <Alert variant="danger">An error occurred while submitting your application. Please try again.</Alert>}
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

export default ApplyPage;
