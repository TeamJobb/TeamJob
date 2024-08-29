import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import mg from '../../../assets/font.jpg'
import './signup.css'
const CreateAccountPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        mobile: '',
        address: '',
        github: '',
        twitter: '',
        instagram: '',
        facebook: '',
        job_title: '',
        location: '',
        website: '',
        experience: '',
        education: '',
        skills: '',
       
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadingImage, setUploadingImage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'ikbelS');

        setUploadingImage(true);
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dnynsji6q/image/upload', uploadData);
            setFormData({ ...formData, image: res.data.secure_url });
            
            setMessageType('success');
            setMessage('Image uploaded successfully!');
        } catch (error) {
            setMessageType('error');
            setMessage('Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handlePrevious = () => setCurrentStep((prev) => prev - 1);

    const validateStep1 = () => formData.firstName && formData.lastName && formData.email && formData.password;
    const validateStep2 = () => true; // Add validation logic for step 2 as needed

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageType('');
        setMessage('');
        setLoading(true);

        if (!validateStep1()) {
            setMessageType('error');
            setMessage('Please fill in all required fields in step 1.');
            setLoading(false);
            return;
        }

        if (!validateStep2()) {
            setMessageType('error');
            setMessage('Please check the fields in step 2.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3022/api/users/register', formData);
            setMessageType('success');
            setMessage('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessageType('error');
            setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="text-center">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-5">
                                {message && (
                                    <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                                        {message}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    {currentStep === 1 && (
                                        <>
                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="First Name"
                                                            name="firstName"
                                                            value={formData.firstName || ''}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="firstName"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Last Name"
                                                            name="lastName"
                                                            value={formData.lastName || ''}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="lastName"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-lg"
                                                            placeholder="Email"
                                                            name="email"
                                                            value={formData.email || ''}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="email"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-lg"
                                                            placeholder="Password"
                                                            name="password"
                                                            value={formData.password || ''}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label className="form-label" htmlFor="password"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Phone"
                                                            name="phone"
                                                            value={formData.phone || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="phone"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Mobile"
                                                            name="mobile"
                                                            value={formData.mobile || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="mobile"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-12">
                                                    <div className="form-outline">
                                                        <input
                                                            type="file"
                                                            className="form-control form-control-lg"
                                                            name="image"
                                                            onChange={handleImageUpload}
                                                        />
                                                        <label className="form-label" htmlFor="image"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="btn btn-secondary" disabled={currentStep === 1} onClick={handlePrevious}>Previous</button>
                                                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                                            </div>
                                        </>
                                    )}

                                    {currentStep === 2 && (
                                        <>
                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Address"
                                                            name="address"
                                                            value={formData.address || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="address"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="GitHub"
                                                            name="github"
                                                            value={formData.github || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="github"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Twitter"
                                                            name="twitter"
                                                            value={formData.twitter || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="twitter"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Instagram"
                                                            name="instagram"
                                                            value={formData.instagram || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="instagram"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Facebook"
                                                            name="facebook"
                                                            value={formData.facebook || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="facebook"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Job Title"
                                                            name="job_title"
                                                            value={formData.job_title || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="job_title"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Location"
                                                            name="location"
                                                            value={formData.location || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="location"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Website"
                                                            name="website"
                                                            value={formData.website || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="website"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Experience"
                                                            name="experience"
                                                            value={formData.experience || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="experience"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Education"
                                                            name="education"
                                                            value={formData.education || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="education"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-12">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Skills"
                                                            name="skills"
                                                            value={formData.skills || ''}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="skills"></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? 'Creating Account...' : 'Submit'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateAccountPage;