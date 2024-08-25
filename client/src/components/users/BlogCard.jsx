import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Toast } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';


import bloganswering from '../../assets/bloganswering.jpg';
import Blogchallenge from '../../assets/Blogchallenge.jpg';
import blogreact from '../../assets/blogreact.jpg';
import blogreacttest from '../../assets/blogreacttest.png';
import blogwoman from '../../assets/blogwoman.jpg';


const BlogCard = () => {
  const [blogs, setBlogs] = useState([
    {
      image: bloganswering,
      title: 'Answering: ',
      description: 'What Is Your Biggest Weakness?',
      date: 'August 13, 2024',
      authorImage: 'https://via.placeholder.com/50',
      badges: ['INTERVIEWS', 'OFFERS'],
    },
    {
      image: blogreact,
      title: 'Advanced React',
      description: 'Dive deep into React hooks and performance optimization.',
      date: 'August 14, 2024',
      authorImage: 'https://via.placeholder.com/50',
      badges: ['React', 'Redux', 'Management'],
    },
    {
      image: Blogchallenge,
      title: '#RiseToTheChallenge:',
      description: 'RiseToTheChallenge, Achieve Professional Growth',
      date: 'August 15, 2024',
      authorImage: 'https://via.placeholder.com/50',
      badges: ['React', 'Redux', 'Management'],
    },
    {
      image: blogreacttest,
      title: 'React Testing',
      description: 'Best practices for testing React components.',
      date: 'August 16, 2024',
      authorImage: 'https://via.placeholder.com/50',
      badges: ['React', 'Testing', 'Jest'],
    },
    {
      image: blogwoman,
      title: 'Women Day',
      description: 'Best World, Best Woman, so Great life.',
      date: 'August 13, 2024',
      authorImage: 'https://via.placeholder.com/50',
      badges: ['Woman', 'Life', 'Happiness'],
    },
  ]);

  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    date: '',
    authorImage: '',
    badges: '',
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      ...formData,
      badges: formData.badges.split(',').map((badge) => badge.trim()),
    };
    setBlogs([newBlog, ...blogs]);
    setFormData({
      image: '',
      title: '',
      description: '',
      date: '',
      authorImage: '',
      badges: '',
    });
    setToastMessage('Blog post added successfully!');
    setShowToast(true);
  };

  const handleDelete = (indexToDelete) => {
    setBlogs(blogs.filter((_, index) => index !== indexToDelete));
    setToastMessage('Blog post deleted successfully!');
    setShowToast(true);
  };

  return (
    <Container className="blog-container my-5">
      <style jsx>{`
        .blog-container {
          max-width: 1200px;
          margin: auto;
        }

        .blog-form-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
        }

        .blog-form-title {
          font-size: 24px;
          font-weight: bold;
          color: #343a40;
        }

        .blog-posts-title {
          font-size: 24px;
          font-weight: bold;
          color: #343a40;
        }

        .blog-card {
          border: none;
          border-radius: 10px;
          transition: box-shadow 0.2s;
        }

        .blog-card:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .blog-card-img-top {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .blog-badge {
          padding: 0.4em 0.8em;
          font-size: 0.75rem;
          margin-right: 5px;
        }

        .blog-author-image {
          width: 40px;
          height: 40px;
        }

        .blog-delete-button {
          background-color: #dc3545;
          color: #fff;
          border: none;
        }

        .blog-delete-button:hover {
          background-color: #c82333;
        }
      `}</style>
      <Row>
        <Col md={4}>
          <div className="blog-form-container p-4 bg-light rounded shadow-sm">
            <h2 className="blog-form-title mb-4">Add a New Blog</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="rounded"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="rounded"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter description"
                  className="rounded"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="rounded"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAuthorImage" className="mb-3">
                <Form.Label>Author Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="authorImage"
                  value={formData.authorImage}
                  onChange={handleChange}
                  placeholder="Enter author image URL"
                  className="rounded"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBadges" className="mb-3">
                <Form.Label>Badges (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="badges"
                  value={formData.badges}
                  onChange={handleChange}
                  placeholder="Enter badges separated by commas"
                  className="rounded"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 rounded">
                Add Blog
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={8}>
          <h2 className="blog-posts-title mb-4">Blog Posts</h2>
          <div className="blog-list">
            {blogs.map((blog, index) => (
              <Card className="blog-card shadow-sm mb-4" key={index}>
                <Card.Img variant="top" src={blog.image} alt={blog.title} className="blog-card-img-top" />
                <Card.Body>
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  <Card.Text>{blog.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-muted">{blog.date}</small>
                    <img
                      src={blog.authorImage}
                      alt="Author"
                      className="blog-author-image rounded-circle"
                    />
                  </div>
                  <div className="mt-2">
                    {blog.badges.map((badge, idx) => (
                      <span key={idx} className="blog-badge badge bg-primary text-white rounded-pill me-1">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-3 blog-delete-button rounded"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 p-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default BlogCard;