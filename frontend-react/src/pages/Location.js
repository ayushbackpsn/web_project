import React from 'react';
import './Location.css';

const Location = () => {
  return (
    <div className="location-page">
      <div className="location-content">
        <div className="location-info">
          <h2>Visit Our Store</h2>
          <p>Experience our premium shoe collection in person at our flagship store.</p>
          
          <h3>Store Information</h3>
          <p><strong>Address:</strong> 123 Fashion Street, Style District, NY 10001</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> info@shoestore.com</p>
          
          <h3>Store Hours</h3>
          <ul className="store-hours">
            <li><strong>Monday - Friday:</strong> 9:00 AM - 8:00 PM</li>
            <li><strong>Saturday:</strong> 10:00 AM - 6:00 PM</li>
            <li><strong>Sunday:</strong> 11:00 AM - 5:00 PM</li>
          </ul>
        </div>
        
        <div className="map-placeholder">
          <div className="map-box">
            <p>📍</p>
            <p>Interactive Map</p>
            <p>Find us easily with GPS navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
