import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import video from '../../../assets/video.mp4'

const LoginPage = ({ loggedIn, setLoggedIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3022/api/users/login', formData);
            console.log('API response:', response);

            setMessageType('success');
            setMessage('Login successful!');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setUser(response.data.user); 

            const userId = response.data.user.id;

            if (userId) {
                setLoggedIn(true);
                navigate(`/profile/${userId}`);
            } else {
                throw new Error('User ID is missing in response');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Status code:', error.response.status);
            }
            setMessageType('error');
            setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        
        <div className="container">

           <br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><h1 className="my-4">Every new job is a  new adventure <br></br>Let's get connected</h1>
            <div className="login-page">
            <video src={video} className="login-video" autoPlay loop muted />
           
        </div>
                    <div className="forms">
                <div className="form-content">
                    <div className="login-form">
                        <div className="title">Login</div>
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
                                <div className="text"><a href="#">Forgot password?</a></div>
                                <div className="butt input-box">
                                    <input type="submit" value="Submit" />
                                </div>
                                <div className="text sign-up-text">
                                    Don't have an account? <label htmlFor="flip">Signup now</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
             
            {message && (
                <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                    {message}
                </div>
                
            )}
        </div>
    );
};

export default LoginPage;