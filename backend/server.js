require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cors = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Routes
const shoeRoutes = require('./routes/shoeRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Shoe Store API is running!',
        version: '2.0.0',
        features: ['Authentication', 'Cart System', 'Order Management', 'WhatsApp Integration']
    });
});

// API Routes
app.use('/api/shoes', shoeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 WhatsApp integration: ${process.env.WHATSAPP_PHONE_NUMBER ? 'Configured' : 'Not configured'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
    console.log('');
    console.log('Available endpoints:');
    console.log('📦 Products:');
    console.log('   GET  /api/shoes           - Get all products');
    console.log('   GET  /api/shoes/:id       - Get single product');
    console.log('');
    console.log('🔐 Authentication:');
    console.log('   POST /api/auth/register    - Register user');
    console.log('   POST /api/auth/login       - Login user');
    console.log('');
    console.log('👤 User:');
    console.log('   GET  /api/users/profile    - Get user profile');
    console.log('   PUT  /api/users/profile    - Update user profile');
    console.log('');
    console.log('🛒 Cart:');
    console.log('   GET  /api/cart            - Get user cart');
    console.log('   POST /api/cart/add         - Add item to cart');
    console.log('   PUT  /api/cart/update/:id  - Update cart item');
    console.log('   DELETE /api/cart/remove/:id - Remove cart item');
    console.log('   DELETE /api/cart/clear     - Clear cart');
    console.log('   GET  /api/cart/count       - Get cart item count');
    console.log('');
    console.log('📦 Orders:');
    console.log('   POST /api/orders          - Create new order');
    console.log('   GET  /api/orders/my-orders - Get user orders');
    console.log('   GET  /api/orders/:id       - Get single order');
    console.log('   PUT  /api/orders/:id/cancel - Cancel order');
    console.log('');
    console.log('🏥 Health:');
    console.log('   GET  /api/health          - Health check');
});

module.exports = app;
