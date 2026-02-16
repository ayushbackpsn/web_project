import axios from 'axios';

// Get API URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://web-project-m88j.onrender.com/api'  // In production, use live backend
    : 'http://localhost:5000/api'; // In development, use local backend

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  try {
    const response = await api.get('/shoes');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/shoes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Auth API
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
