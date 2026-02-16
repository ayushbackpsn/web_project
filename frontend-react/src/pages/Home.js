import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        // Get first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
        setError(null);
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const addToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading featured products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Step Into Style</h1>
          <p>Discover our premium collection of modern footwear</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">👟</div>
          <h3>Premium Quality</h3>
          <p>Handpicked selection of the finest footwear brands with guaranteed authenticity.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast Delivery</h3>
          <p>Quick and reliable shipping to your doorstep within 3-5 business days.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💯</div>
          <h3>Customer Satisfaction</h3>
          <p>30-day return policy and 24/7 customer support for your peace of mind.</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-container">
          {featuredProducts.map((product, index) => (
            <div 
              key={product._id} 
              className="product-card loaded"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/280x250?text=No+Image';
                }}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product.name)}
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${product._id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
