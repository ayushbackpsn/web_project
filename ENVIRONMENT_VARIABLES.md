# 🔧 Environment Variables for New Backend Deployment

## 📋 Copy These Exactly for Render Backend:

### Required Environment Variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://backpsn:Backpsn1234@cluster0.ocsjera.mongodb.net/shoe-store?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
WHATSAPP_PHONE_NUMBER=+1234567890
FRONTEND_URL=https://web-1.onrender.com
```

### Optional Variables (Recommended):

```
BCRYPT_ROUNDS=12
JWT_EXPIRE=7d
```

## 🎯 Step-by-Step Setup:

### 1. In Render Dashboard:
- Go to your new backend service
- Click "Environment" tab
- Click "Add Environment Variable"

### 2. Add Each Variable:
Copy and paste each line exactly as shown above:

#### Variable 1:
- **Key**: `NODE_ENV`
- **Value**: `production`

#### Variable 2:
- **Key**: `PORT`
- **Value**: `10000`

#### Variable 3:
- **Key**: `MONGODB_URI`
- **Value**: `mongodb+srv://backpsn:Backpsn1234@cluster0.ocsjera.mongodb.net/shoe-store?retryWrites=true&w=majority`

#### Variable 4:
- **Key**: `JWT_SECRET`
- **Value**: `your-super-secret-jwt-key-change-this-in-production-2024`

#### Variable 5:
- **Key**: `WHATSAPP_PHONE_NUMBER`
- **Value**: `+1234567890`

#### Variable 6:
- **Key**: `FRONTEND_URL`
- **Value**: `https://web-1.onrender.com`

### 3. Save and Deploy:
- Click "Save Changes"
- Service will auto-redeploy
- Wait 3-5 minutes for completion

## 🔍 What Each Variable Does:

### NODE_ENV=production
- Sets environment to production mode
- Enables production optimizations

### PORT=10000
- Server port for Render
- Required for Render deployment

### MONGODB_URI
- MongoDB Atlas connection string
- Connects to your shoe database

### JWT_SECRET
- Secret key for authentication tokens
- Change this for better security

### WHATSAPP_PHONE_NUMBER
- Store owner's WhatsApp number
- For order notifications

### FRONTEND_URL
- Your frontend URL for CORS
- Allows frontend to connect to backend

## 🧪 Test After Deployment:

### Health Check:
```bash
curl https://your-backend-url.onrender.com/api/health
```

### Products API:
```bash
curl https://your-backend-url.onrender.com/api/shoes
```

## ✅ Expected Results:

### Backend Should Respond:
```json
{"status":"OK","timestamp":"...","environment":"production"}
```

### Frontend Should Load:
- Products from MongoDB
- Shopping cart working
- Checkout process complete

---

**Copy these environment variables exactly when creating your new backend service!** 🔧

**Your shoe store will be fully functional once backend is deployed with these settings.** 🛍️✨
