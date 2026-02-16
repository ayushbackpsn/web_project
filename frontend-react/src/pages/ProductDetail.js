import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert(`${product.name} (Size: ${selectedSize}, Qty: ${quantity}) added to cart!`);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading product details...
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

  if (!product) {
    return (
      <div className="error">
        Product not found
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-brand">{product.brand}</p>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-detail-description">
            <h3>Description</h3>
            <p>Experience premium comfort and style with the {product.name}. Designed for {product.category.toLowerCase()} enthusiasts, this shoe combines cutting-edge technology with timeless design to deliver exceptional performance and aesthetic appeal.</p>
          </div>

          <div className="product-detail-sizes">
            <h3>Available Sizes</h3>
            <div className="size-options">
              {['7', '8', '9', '10', '11', '12'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn-detail"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <button 
            className="back-btn"
            onClick={() => navigate('/products')}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
