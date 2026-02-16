import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (err) {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to share feedback, we're here to help.</p>
          
          <div className="contact-details">
            <h3>Contact Information</h3>
            <p><strong>Customer Service:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> support@shoestore.com</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="contact-submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
