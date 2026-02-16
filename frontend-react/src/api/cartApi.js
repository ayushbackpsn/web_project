import axios from 'axios';

// Get API URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '/api'  // In production, use relative path
    : 'http://localhost:5000/api'; // In development, use local backend

// Get user's cart
export const getCart = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

// Add item to cart
export const addToCart = async (itemData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart/add`, itemData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Update cart item quantity
export const updateCartItem = async (itemId, updateData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/cart/update/${itemId}`, updateData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (itemId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cart/remove/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

// Clear cart
export const clearCart = async (token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cart/clear`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

// Get cart item count
export const getCartCount = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart/count`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting cart count:', error);
        throw error;
    }
};
