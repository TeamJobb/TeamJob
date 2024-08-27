import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Employers/employerReg.css';

function EmployerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3022/api/employers/register', formData);
      alert('Registration successful!');
      navigate('/login-Employer'); 
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="fiche-center">
      <div className="cart">
        <h1 className="RE">Register</h1>
        <br /><br /><br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Enter your Company Name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-control" 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Enter your email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-control" 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Enter your password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="form-control" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}

export default EmployerRegister;
