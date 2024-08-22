import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className='container'>
      
      <div className='contactSection'>
        <div className='contactInfo'>
          <div className='infoBlock'>
            <span className='icon'>📞</span>
            <h2>Call To Us</h2>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className='infoBlock'>
            <span className='icon'>✉️</span>
            <h2>Write To US</h2>
            <p>Fill out our form and we will contact you within 24 hours. </p>
            <p>Job-Portal is the leading job site in the Middle East and North Africa, connecting job seekers with employers looking to hire. Every day, thousands of new job vacancies are listed on the award-winning platform from the region's top employers.
            </p>
            <p>Emails: JobPortal@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className='input'
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            className='input'
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
            className='input'
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className='textarea'
            required
          />
          <button type="submit" className='button'>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
