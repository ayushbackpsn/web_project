import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './CartIcon';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          👟 Shoe Store
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className={location.pathname === '/products' ? 'active' : ''}
            >
              Products
            </Link>
          </li>
          <li>
            <CartIcon />
          </li>
          <li>
            <Link 
              to="/location" 
              className={location.pathname === '/location' ? 'active' : ''}
            >
              Location
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`login-nav-btn ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              to="/signup" 
              className={`signup-nav-btn ${location.pathname === '/signup' ? 'active' : ''}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
