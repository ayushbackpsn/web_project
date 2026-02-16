require('dotenv').config();
const mongoose = require('mongoose');
const Shoe = require('./models/Shoe');

// Sample shoe data
const shoeData = [
    {
        name: "Nike Air Max 270",
        brand: "Nike",
        price: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Running"
    },
    {
        name: "Adidas Ultra Boost",
        brand: "Adidas",
        price: 180,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Running"
    },
    {
        name: "Puma RS-X",
        brand: "Puma",
        price: 120,
        image: "https://images.unsplash.com/photo-1460353581641-374adda58c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        name: "New Balance 574",
        brand: "New Balance",
        price: 90,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        name: "Converse Chuck Taylor",
        brand: "Converse",
        price: 60,
        image: "https://images.unsplash.com/photo-1608231387042-66d6305a2660?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        name: "Vans Old Skool",
        brand: "Vans",
        price: 70,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Skate"
    },
    {
        name: "Reebok Classic",
        brand: "Reebok",
        price: 85,
        image: "https://images.unsplash.com/photo-1576031169113-7334e3cf1c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        name: "Jordan Air 1",
        brand: "Jordan",
        price: 200,
        image: "https://images.unsplash.com/photo-1605348532760-1b85be30e404?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Basketball"
    }
];

// Connect to database and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB Atlas using environment variable
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ Connected to MongoDB Atlas');
        
        // Clear existing data
        await Shoe.deleteMany({});
        console.log('Cleared existing shoe data');
        
        // Insert new data
        await Shoe.insertMany(shoeData);
        console.log(`Inserted ${shoeData.length} shoes into database`);
        
        console.log('Database seeded successfully!');
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the seed function
seedDatabase();
