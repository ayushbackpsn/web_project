# 🚀 Deploy Shoe Store to Render

This guide will help you deploy your complete shoe store application to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at https://render.com
2. **GitHub Account**: Create repository for your code
3. **MongoDB Atlas**: Your existing database connection

## 🗂️ Project Structure

```
shoe-store/
├── backend/                 # Node.js API
│   ├── server.js
│   ├── package.json
│   ├── render.yaml
│   ├── Procfile
│   └── .gitignore
├── frontend-react/          # React frontend
│   ├── src/
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🔧 Configuration Files Created

### Backend Configuration:
- ✅ `render.yaml` - Render service configuration
- ✅ `Procfile` - Process file for Node.js
- ✅ `.gitignore` - Ignore sensitive files

### Frontend Configuration:
- ✅ Updated `package.json` with `"homepage": "."`
- ✅ Updated API URLs for production
- ✅ `.gitignore` for frontend

## 🚀 Deployment Steps

### Step 1: Push to GitHub

1. **Initialize Git Repository**:
```bash
cd c:\Users\Ayush\CascadeProjects\windsurf-project\shoe-store
git init
git add .
git commit -m "Initial commit - Shoe Store with Cart and WhatsApp"
```

2. **Create GitHub Repository**:
   - Go to https://github.com
   - Create new repository: `shoe-store`
   - Copy repository URL

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/shoe-store.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub**: Choose your repository
4. **Configure Service**:
   - **Name**: `shoe-store-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://backpsn:Backpsn1234@cluster0.ocsjera.mongodb.net/shoe-store?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   WHATSAPP_PHONE_NUMBER=+1234567890
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

6. **Deploy**: Click "Create Web Service"

### Step 3: Deploy Frontend to Render

1. **Go to Render Dashboard**
2. **Click "New +" → "Web Service"**
3. **Connect Same Repository**
4. **Configure Frontend Service**:
   - **Name**: `shoe-store-frontend`
   - **Root Directory**: `frontend-react`
   - **Runtime**: `Static`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Instance Type**: `Free`

5. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   ```

6. **Deploy**: Click "Create Web Service"

## 🔗 Environment Variables

### Backend Environment Variables:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://backpsn:Backpsn1234@cluster0.ocsjera.mongodb.net/shoe-store?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
WHATSAPP_PHONE_NUMBER=+1234567890
FRONTEND_URL=https://your-app-name.onrender.com
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

## 🌐 Access Your Deployed App

After deployment, your app will be available at:

### Frontend URL:
```
https://your-app-name.onrender.com
```

### Backend API URL:
```
https://your-backend-name.onrender.com/api
```

### Health Check:
```
https://your-backend-name.onrender.com/api/health
```

## 🧪 Testing Deployment

### 1. Check Backend Health:
```bash
curl https://your-backend-name.onrender.com/api/health
```

### 2. Test Frontend:
- Visit your frontend URL
- Check if products load
- Test cart functionality
- Test checkout process

### 3. Test WhatsApp Integration:
- Place an order
- Verify WhatsApp URL opens correctly

## 🔧 Troubleshooting

### Common Issues:

#### 1. Build Failures:
- Check `package.json` scripts
- Verify all dependencies are installed
- Check build logs in Render dashboard

#### 2. Database Connection:
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

#### 3. CORS Issues:
- Verify `FRONTEND_URL` matches your frontend URL
- Check CORS configuration in backend

#### 4. WhatsApp Not Working:
- Verify `WHATSAPP_PHONE_NUMBER` is set
- Check WhatsApp service configuration

## 📱 WhatsApp Integration in Production

Your WhatsApp integration will work the same way as in development:
- Orders automatically generate WhatsApp URLs
- Store owner receives order details
- Customers can share orders via WhatsApp

## 🔄 Auto-Deploy

Both services are configured for auto-deployment:
- Push changes to GitHub
- Render automatically rebuilds and deploys
- No manual intervention needed

## 💰 Pricing

### Render Free Tier:
- **750 hours/month** of free instance time
- **Static sites**: Unlimited
- **Custom domains**: Available on paid plans
- **SSL certificates**: Free and automatic

### Upgrade Options:
- **Starter**: $7/month for more power
- **Standard**: $25/month for production apps
- **Pro**: $100/month for high-traffic apps

## 🎯 Next Steps

1. **Deploy to Render** using this guide
2. **Test all features** in production
3. **Monitor performance** in Render dashboard
4. **Set up custom domain** (optional)
5. **Scale up** if needed

## 📞 Support

- **Render Documentation**: https://render.com/docs
- **Community Forum**: https://community.render.com
- **Status Page**: https://status.render.com

---

**🎉 Your shoe store will be live on Render with:**
- ✅ Complete e-commerce functionality
- ✅ WhatsApp order notifications
- ✅ Modern React frontend
- ✅ Node.js backend
- ✅ MongoDB database
- ✅ Auto-deployment from GitHub
