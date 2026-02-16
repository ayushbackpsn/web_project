import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartCount } from '../api/cartApi';
import './CartIcon.css';

const CartIcon = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await getCartCount(token);
                    setCartCount(response.count);
                }
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <Link to="/cart" className="cart-icon">
            <span className="cart-symbol">🛒</span>
            {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
            )}
        </Link>
    );
};

export default CartIcon;
