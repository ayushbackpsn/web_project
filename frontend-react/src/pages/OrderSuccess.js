import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    return (
        <div className="order-success-page">
            <div className="success-container">
                <div className="success-icon">✅</div>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your order. You will receive a confirmation via WhatsApp shortly.</p>
                <p>Your order details have been sent to the store owner and will be processed soon.</p>
                
                <div className="success-actions">
                    <Link to="/products" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className="view-orders-btn">
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
