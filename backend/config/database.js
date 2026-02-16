const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔗 Attempting to connect to MongoDB Atlas...');
        console.log('📝 Connection URI:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':***@'));
        
        // Connect to MongoDB Atlas
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌐 Connection ready for operations`);
    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        if (error.name === 'MongoServerError') {
            console.error('MongoDB error code:', error.code);
            console.error('MongoDB error codeName:', error.codeName);
        }
        
        console.log('🔧 Continuing without database for development...');
        console.log('📝 Current URI:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':***@'));
    }
};

module.exports = connectDB;
