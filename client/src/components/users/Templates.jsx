import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Templates.css';
import temp1 from '../../assets/td-3.png';
import temp2 from '../../assets/td-4.png';
import temp3 from '../../assets/td-1.png';
import temp4 from '../../assets/td-2.png';

const Templates = () => {
    const navigate = useNavigate();

    const handleViewNowClick = () => {
        navigate('/form');
    };

    return (
        <section className="container my-5" id="Templates">
            <div className="my-5">
                <h2 className="my-4">Our Templates</h2>
                <p className="lead">
                    Making a resume is the first step of any job search. Not sure how to make a resume? Our online resume builder gives you free resume templates to follow.
                </p>
            </div>

            <div className="row">
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card">
                        <img src={temp1} className="card-img-top rounded mx-auto" alt="phone-1" />
                        <div className="card-body">
                            <h5 className="card-title">For Freshers</h5>
                            <button className="btn btn-info mt-3" onClick={handleViewNowClick}>View Now →</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card">
                        <img src={temp2} className="card-img-top rounded mx-auto" alt="phone-2" />
                        <div className="card-body">
                            <h5 className="card-title">For Mobile Developer</h5>
                            <button className="btn btn-info mt-3" onClick={handleViewNowClick}>View Now →</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card">
                        <img src={temp3} className="card-img-top rounded mx-auto" alt="phone-3" />
                        <div className="card-body">
                            <h5 className="card-title">For Web Developer</h5>
                            <button className="btn btn-info mt-3" onClick={handleViewNowClick}>View Now →</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4">
                    <div className="card">
                        <img src={temp4} className="card-img-top rounded mx-auto" alt="phone-4" />
                        <div className="card-body">
                            <h5 className="card-title">For Software Engineer</h5>
                            <button className="btn btn-info mt-3" onClick={handleViewNowClick}>View Now →</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Templates;
