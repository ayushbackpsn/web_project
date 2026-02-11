const express = require('express');
const connectDB = require('./config/db');
const shoeRoutes = require('./routes/shoeRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shoes', shoeRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
