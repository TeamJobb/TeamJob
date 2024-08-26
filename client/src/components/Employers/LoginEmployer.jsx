import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../users/Login/LoginPage.css'; // Import the same CSS file
import video from '../../assets/video.mp4'; // Assuming you want to keep the video background

function EmployerLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3020/api/employers/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/Home-Employer'); // Navigate to HomePage after login
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br>
            <h1 className="my-4">Welcome Back, Employer! <br></br>Let's Manage Your Jobs</h1>
            <div className="login-page">
                <video src={video} className="login-video" autoPlay loop muted />
                <div className="forms">
                    <div className="form-content">
                        <div className="login-form">
                            <div className="title">Employer Login</div>
                            <form onSubmit={handleSubmit}>
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="butt input-box">
                                        <input type="submit" value="Submit" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerLogin;
