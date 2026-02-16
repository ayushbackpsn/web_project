import axios from 'axios';

// Get API URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://web-project-m88j.onrender.com/api'  // In production, use live backend
    : 'http://localhost:5000/api'; // In development, use local backend

// Create new order
export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get user's orders
export const getUserOrders = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/my-orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get single order
export const getOrderById = async (orderId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// Cancel order
export const cancelOrder = async (orderId, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/cancel`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw error;
    }
};
