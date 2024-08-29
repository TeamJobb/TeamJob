import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../users/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../users/Login/LoginPage.css'; 
import video from '../../assets/video.mp4'; 

function EmployerLogin({handleLogin}) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { setUser, setLoggedIn, setRole } = useContext(UserContext); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3022/api/employers/login', formData);
            handleLogin("employer")
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); 
            setUser(response.data.user); 
            setLoggedIn(true); 
            setRole('employer'); 
            navigate('/Home-Employer'); 
        } catch (error) {
            console.log(error);
            
            alert('Login failed. Please try again.',error);
        }
    };

    return (
        <div className="container">
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1 className="my-4">Welcome Back, Employer! <br />Let's Manage Your Jobs</h1>
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