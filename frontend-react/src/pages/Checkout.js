import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderApi';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'USA',
        paymentMethod: 'cash_on_delivery'
    });

    useEffect(() => {
        // Get cart data from sessionStorage
        const cartData = sessionStorage.getItem('checkoutCart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        } else {
            navigate('/cart');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!cart || cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Validate form
        if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            setSubmitting(true);
            const token = localStorage.getItem('token');
            
            // Prepare order data
            const orderData = {
                items: cart.items,
                shippingAddress: {
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country
                },
                paymentMethod: formData.paymentMethod
            };

            const response = await createOrder(orderData, token);
            
            // Show WhatsApp URL
            if (response.whatsappUrl) {
                // Open WhatsApp in new window
                window.open(response.whatsappUrl, '_blank');
                
                // Show success message
                alert('Order placed successfully! WhatsApp opened with order details.');
            } else {
                alert('Order placed successfully!');
            }

            // Clear cart data
            sessionStorage.removeItem('checkoutCart');
            
            // Redirect to order confirmation
            navigate('/order-success');
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="checkout-page">
                <div className="loading">
                    Loading checkout...
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="empty-checkout">
                    <h2>Checkout</h2>
                    <p>Your cart is empty</p>
                    <Link to="/products" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const calculateTotal = () => {
        const itemsTotal = cart.totalPrice;
        const shipping = itemsTotal > 100 ? 0 : 10;
        const tax = itemsTotal * 0.08;
        return itemsTotal + shipping + tax;
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <Link to="/cart" className="back-to-cart">
                        ← Back to Cart
                    </Link>
                </div>

                <div className="checkout-content">
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cart.items.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <div className="item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-details">{item.brand} | Size: {item.size}</span>
                                    </div>
                                    <div className="item-pricing">
                                        <span className="item-quantity">x{item.quantity}</span>
                                        <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="summary-totals">
                            <div className="total-row">
                                <span>Items Total:</span>
                                <span>${cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping:</span>
                                <span>{cart.totalPrice > 100 ? 'FREE' : '$10.00'}</span>
                            </div>
                            <div className="total-row">
                                <span>Tax (8%):</span>
                                <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="total-row grand-total">
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="shipping-form">
                        <h3>Shipping Information</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your street address"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your city"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postalCode">Postal Code *</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your postal code"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Enter your country"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="paymentMethod">Payment Method</label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                >
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                    <option value="credit_card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                className="place-order-btn"
                                disabled={submitting}
                            >
                                {submitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
