# 🚀 Manual Deployment to Render (Recommended)

Since `render.yaml` is causing issues, let's deploy manually for better control.

## 📋 Step-by-Step Manual Deployment

### Step 1: Deploy Backend First

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub**: Choose `ayushbackpsn/web_project`
4. **Configure Backend Service**:
   - **Name**: `shoe-store-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
   - **Health Check Path**: `/api/health`

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://backpsn:Backpsn1234@cluster0.ocsjera.mongodb.net/shoe-store?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   WHATSAPP_PHONE_NUMBER=+1234567890
   FRONTEND_URL=https://shoe-store-frontend.onrender.com
   ```

6. **Click "Create Web Service"**

### Step 2: Deploy Frontend

1. **Wait for backend to deploy completely**
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
   REACT_APP_API_URL=https://shoe-store-api.onrender.com/api
   ```

6. **Click "Create Web Service"**

## 🔧 Why Manual Deployment Works Better

### Issues with render.yaml:
- ❌ Path resolution problems
- ❌ Complex configuration debugging
- ❌ Limited control over individual services

### Benefits of Manual Deployment:
- ✅ Clear visibility of each service
- ✅ Easy debugging
- ✅ Individual service control
- ✅ Better error handling

## 📱 After Deployment

### Backend URL:
```
https://shoe-store-api.onrender.com/api
```

### Frontend URL:
```
https://shoe-store-frontend.onrender.com
```

### Test Endpoints:
```bash
# Health Check
curl https://shoe-store-api.onrender.com/api/health

# Get Products
curl https://shoe-store-api.onrender.com/api/shoes
```

## 🔄 Auto-Deploy Still Works

Even with manual setup:
- ✅ Push to GitHub → Auto-rebuild
- ✅ Individual service control
- ✅ Rollback capabilities
- ✅ Environment variable management

## 🎯 Quick Checklist

### Before Deployment:
- [ ] Backend Procfile exists ✅
- [ ] Frontend Procfile created ✅
- [ ] All .gitignore files in place ✅
- [ ] API URLs updated for production ✅

### After Backend Deploy:
- [ ] Health check passes
- [ ] Products API works
- [ ] MongoDB connection successful

### After Frontend Deploy:
- [ ] Frontend loads
- [ ] Products display
- [ ] Cart functionality works
- [ ] Checkout process complete

## 🚨 Troubleshooting

### If Backend Fails:
1. Check MongoDB URI in environment variables
2. Verify PORT is set to 10000
3. Check build logs in Render dashboard

### If Frontend Fails:
1. Verify REACT_APP_API_URL is correct
2. Check build command completes successfully
3. Ensure build directory is created

### If Both Fail:
1. Delete services and recreate
2. Check GitHub repository structure
3. Verify all files are committed

---

**This manual approach gives you complete control and eliminates the render.yaml path issues!** 🎉
