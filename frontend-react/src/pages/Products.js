import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import { addToCart } from '../api/cartApi';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  const handleAddToCart = async (product, size) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        return;
      }

      const cartItem = {
        productId: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        size: size,
        quantity: 1,
        image: product.image
      };

      await addToCart(cartItem, token);
      alert(`${product.name} (Size: ${size}) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading products...
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
    <div className="products-page">
      <div className="products-section">
        <h2>All Products</h2>
        <div className="products-container">
          {products.map((product, index) => (
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
                  <div className="size-selection">
                    <label htmlFor={`size-${product._id}`}>Size:</label>
                    <select 
                      id={`size-${product._id}`}
                      className="size-select"
                      onChange={(e) => {
                        const size = e.target.value;
                        const button = e.target.parentElement.parentElement.querySelector('.add-to-cart-btn');
                        button.textContent = `Add to Cart (Size: ${size})`;
                      }}
                    >
                      <option value="">Select Size</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => {
                      const sizeSelect = document.getElementById(`size-${product._id}`);
                      const selectedSize = sizeSelect ? sizeSelect.value : null;
                      if (!selectedSize) {
                        alert('Please select a size');
                        return;
                      }
                      handleAddToCart(product, selectedSize);
                    }}
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
      </div>
    </div>
  );
};

export default Products;
