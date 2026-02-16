import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../api/cartApi';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const cartData = await getCart(token);
            setCart(cartData);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            setUpdating(true);
            const token = localStorage.getItem('token');
            await updateCartItem(itemId, { quantity: newQuantity }, token);
            await loadCart(); // Reload cart to get updated totals
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setUpdating(false);
        }
    };

    const removeItem = async (itemId) => {
        try {
            setUpdating(true);
            const token = localStorage.getItem('token');
            await removeFromCart(itemId, token);
            await loadCart(); // Reload cart to get updated totals
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setUpdating(false);
        }
    };

    const clearCartItems = async () => {
        if (!window.confirm('Are you sure you want to clear your cart?')) {
            return;
        }

        try {
            setUpdating(true);
            const token = localStorage.getItem('token');
            await clearCart(token);
            setCart({ items: [], totalItems: 0, totalPrice: 0 });
        } catch (error) {
            console.error('Error clearing cart:', error);
        } finally {
            setUpdating(false);
        }
    };

    const proceedToCheckout = () => {
        if (!cart || cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Store cart data in sessionStorage for checkout page
        sessionStorage.setItem('checkoutCart', JSON.stringify(cart));
        window.location.href = '/checkout';
    };

    if (loading) {
        return (
            <div className="cart-page">
                <div className="loading">
                    Loading cart...
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-cart">
                    <h2>Your Cart</h2>
                    <div className="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <Link to="/products" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button 
                        className="clear-cart-btn"
                        onClick={clearCartItems}
                        disabled={updating}
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="cart-items-section">
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="item-image">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                        }}
                                    />
                                </div>
                                
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-brand">{item.brand}</p>
                                    <p className="item-size">Size: {item.size}</p>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                </div>
                                
                                <div className="item-controls">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={updating || item.quantity <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            disabled={updating}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <div className="item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    
                                    <button 
                                        className="remove-item-btn"
                                        onClick={() => removeItem(item._id)}
                                        disabled={updating}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Items ({cart.totalItems}):</span>
                        <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>{cart.totalPrice > 100 ? 'FREE' : '$10.00'}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (8%):</span>
                        <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>
                            ${(cart.totalPrice > 100 ? cart.totalPrice * 1.08 : cart.totalPrice * 1.08 + 10).toFixed(2)}
                        </span>
                    </div>
                    
                    <button 
                        className="checkout-btn"
                        onClick={proceedToCheckout}
                        disabled={updating}
                    >
                        Proceed to Checkout
                    </button>
                    
                    <Link to="/products" className="continue-shopping-link">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
