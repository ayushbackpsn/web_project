# Shoe Store

A beginner-friendly mini shoe ecommerce website with Node.js backend and vanilla JavaScript frontend.

## Project Structure

```
shoe-store/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │     └── Shoe.js
│   ├── routes/
│   │     └── shoeRoutes.js
│   ├── config/
│   │     └── db.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── products.html
    ├── location.html
    ├── contact.html
    ├── style.css
    └── script.js
```

## Features

### Frontend (4 Pages)
- **Home Page** (`index.html`) - Hero section with featured products
- **Products Page** (`products.html`) - Full product listing from API
- **Location Page** (`location.html`) - Store address and hours
- **Contact Page** (`contact.html`) - Contact form with validation

### Navigation
- Responsive navbar on all pages
- Links: Home | Products | Location | Contact
- Active page highlighting

### Product Cards Display
- Shoe Image
- Shoe Name
- Brand
- Category
- Price
- Add to Cart button (alert message)

### Backend
- Node.js + Express server
- GET /api/shoes endpoint
- MongoDB integration

### Database Schema
```javascript
{
  name: String (required),
  brand: String (required),
  price: Number (required),
  image: String (required),
  category: String (default: "Running")
}
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. Open any HTML file in your browser:
   - `frontend/index.html` for home page
   - `frontend/products.html` for products page
   - `frontend/location.html` for location page
   - `frontend/contact.html` for contact page

### Database Setup
1. Make sure MongoDB is running on localhost:27017
2. The database will be created automatically as "shoe-store"
3. Insert sample data:

```javascript
db.shoes.insertMany([
    {
        name: "Nike Air Max",
        brand: "Nike",
        price: 129.99,
        image: "https://via.placeholder.com/280x250?text=Nike+Air+Max",
        category: "Running"
    },
    {
        name: "Adidas Ultra Boost",
        brand: "Adidas",
        price: 149.99,
        image: "https://via.placeholder.com/280x250?text=Adidas+Ultra+Boost",
        category: "Running"
    },
    {
        name: "Puma Classic",
        brand: "Puma",
        price: 89.99,
        image: "https://via.placeholder.com/280x250?text=Puma+Classic",
        category: "Casual"
    },
    {
        name: "Reebok CrossFit",
        brand: "Reebok",
        price: 109.99,
        image: "https://via.placeholder.com/280x250?text=Reebok+CrossFit",
        category: "Training"
    },
    {
        name: "New Balance 574",
        brand: "New Balance",
        price: 79.99,
        image: "https://via.placeholder.com/280x250?text=New+Balance+574",
        category: "Casual"
    }
]);
```

## API Endpoints
- `GET /api/shoes` - Returns all shoes from database

## Features Implemented
✅ 4-page website with navigation  
✅ Product cards with all required fields  
✅ Add to Cart functionality (alert)  
✅ Contact form with validation  
✅ Store location page  
✅ Responsive design  
✅ Beginner-friendly code  
✅ No login/signup, payment, or admin panel  

## Important Notes
- This is a minimal, beginner-level project
- No cart page, checkout, or payment functionality
- Contact form shows success message but doesn't actually send emails
- Images use placeholder URLs - replace with real product images
