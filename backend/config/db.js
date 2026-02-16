const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace <password> with your actual database user password
        const conn = await mongoose.connect('mongodb+srv://ayush:<password>@cluster0.xxxxx.mongodb.net/shoe-store?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
