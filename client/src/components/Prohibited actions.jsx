import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import img15 from '../assets/15.jpg'; // Adjust the path as necessary
import './ProhibitedActions.css'; // Import your CSS

const ProhibitedActions = () => {
    return (
        <div className="prohibited-actions">
            <div className="image-container">
                <img src={img15} alt="Prohibited Actions" className="prohibited-image" />
                <div className="overlay-text">
                    <p className='Actions'>
                        These prohibited actions help ensure a safe, professional, and efficient environment for all users of our job search application. Please try to apply it:
                    </p>
                    <ul>
                        <li><strong>Providing False Information:</strong> Users are not allowed to provide false or misleading information in their profiles, resumes, or job applications. This includes falsifying qualifications, work history, or references.</li>
                        <li><strong>Spamming or Misuse of the Messaging System:</strong> Sending unsolicited messages, spam, or using the messaging system to harass other users is strictly prohibited.</li>
                        <li><strong>Impersonation:</strong> Users must not impersonate another person or entity, or falsely claim to represent a company or organization.</li>
                        <li><strong>Posting Inappropriate Content:</strong> Posting content that is offensive, discriminatory, or unrelated to job searching (such as advertisements, inappropriate images, or offensive language) is forbidden.</li>
                        <li><strong>Misuse of Job Listings:</strong> Applying for jobs with no intention of accepting an offer, or using job listings for purposes other than job seeking, such as collecting information for spamming.</li>
                        <li><strong>Data Scraping:</strong> Unauthorized scraping or extraction of data from the platform, including job listings, user profiles, or contact information, is not allowed.</li>
                        <li><strong>Violating Privacy:</strong> Sharing or distributing another user's personal information without their explicit consent is prohibited.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProhibitedActions;
