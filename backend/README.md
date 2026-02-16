# Shoe Store Backend API

Complete backend for shoe store with authentication, cart system, order management, and WhatsApp integration.

## 🚀 Features

- **Authentication**: User registration and login with JWT
- **Product Management**: Full CRUD operations for shoes
- **Cart System**: Add, update, remove items from cart
- **Order Management**: Create orders, track status, cancel orders
- **WhatsApp Integration**: Automatic order notifications via WhatsApp
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling middleware
- **CORS**: Cross-origin resource sharing configuration

## 📋 Prerequisites

- Node.js 16.0.0 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoe-store/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shoe-store
   JWT_SECRET=your-super-secret-jwt-key
   WHATSAPP_PHONE_NUMBER=+1234567890
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### 📦 Products
- `GET /api/shoes` - Get all products
- `GET /api/shoes/:id` - Get single product

### 👤 Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### 🛒 Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update/:itemId` - Update cart item (protected)
- `DELETE /api/cart/remove/:itemId` - Remove cart item (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)
- `GET /api/cart/count` - Get cart item count (protected)

### 📦 Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/cancel` - Cancel order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin)

### 🏥 Health
- `GET /api/health` - Health check
- `GET /` - API information

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT secret key | Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `WHATSAPP_PHONE_NUMBER` | WhatsApp number for orders | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## 📱 WhatsApp Integration

Orders are automatically sent to WhatsApp when created. In development mode, the WhatsApp URL is logged to console.

### WhatsApp Message Format
```
New Order! 🛍️

Customer: John Doe
Phone: +1234567890

Products:
1. Nike Air Max 270 (Nike)
   Size: 10 | Qty: 2 | $300.00

2. Adidas Ultra Boost (Adidas)
   Size: 9 | Qty: 1 | $180.00

Total: $506.40
```

## 🗂️ Database Schema

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Shoe
```javascript
{
  name: String,
  brand: String,
  price: Number,
  image: String,
  category: String
}
```

### Cart
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Shoe),
    name: String,
    brand: String,
    price: Number,
    size: String,
    quantity: Number,
    image: String
  }],
  totalItems: Number,
  totalPrice: Number
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: [CartItem],
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  status: String,
  isPaid: Boolean,
  isDelivered: Boolean,
  whatsappSent: Boolean
}
```

## 🔒 Security Features

- **Password Hashing**: Using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configurable cross-origin access
- **Input Validation**: Request data validation
- **Error Handling**: Comprehensive error handling

## 🧪 Testing

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Test Products
```bash
# Get all products
curl http://localhost:5000/api/shoes

# Get single product
curl http://localhost:5000/api/shoes/1
```

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure MongoDB Atlas for production
3. Set up WhatsApp Business API for production
4. Configure CORS for production domain

### Start Production Server
```bash
NODE_ENV=production npm start
```

## 📝 Development

### Adding New Routes
1. Create route file in `/routes/`
2. Add route to `server.js`
3. Use authentication middleware where needed

### Database Models
1. Create schema in `/models/`
2. Use Mongoose for database operations
3. Include validation and middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact:
- Email: support@shoestore.com
- Phone: +1234567890
