
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            const response = await axios.post('http://localhost:3020/api/users/login', formData);
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
            <h2 className="my-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && (
                <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};

export default LoginPage;