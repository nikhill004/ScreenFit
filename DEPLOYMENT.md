# Deployment Guide

## Architecture
- **Frontend**: Vercel (React app)
- **Backend**: Render/Railway (Express API)
- **Database**: MongoDB Atlas (already set up)

---

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `digital-wellness-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 1.3 Add Environment Variables
Go to "Environment" tab and add:

```
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-wellness?retryWrites=true&w=majority
```

**Important**: Use your actual MongoDB Atlas connection string!

### 1.4 Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)
- Copy your API URL: `https://digital-wellness-api.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Add Environment Variable in Vercel
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://digital-wellness-api.onrender.com/api
   ```
   (Replace with your actual Render URL)

### 2.2 Redeploy
- Go to Deployments tab
- Click "Redeploy" on latest deployment
- Or push new commit to trigger auto-deploy

---

## Step 3: Update Backend CORS (Important!)

Your backend needs to allow requests from Vercel domain.

Update `server/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://your-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Then push changes and Render will auto-redeploy.

---

## Alternative: Deploy Backend to Railway

### Railway Setup
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click "Add variables" and add:
   ```
   PORT=3001
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   ```
6. In Settings:
   - Set Root Directory: `server`
   - Set Start Command: `npm start`
7. Deploy!

---

## Testing Your Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

Should return:
```json
{"status":"ok","message":"Digital Wellness API is running"}
```

### Test Frontend
1. Visit your Vercel URL
2. Try signing up
3. Try logging in
4. Try adding a task

---

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend Issues
- Check browser console for errors
- Verify VITE_API_URL is set correctly in Vercel
- Check Network tab for failed API calls

### CORS Errors
- Update CORS origin in `server/server.js`
- Add your Vercel domain to allowed origins
- Redeploy backend

---

## Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Vercel Free Tier:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS

**MongoDB Atlas Free Tier:**
- 512MB storage
- Shared cluster
- Perfect for small projects

---

## Cost to Scale

When you outgrow free tier:
- **Render**: $7/month for always-on instance
- **Vercel**: Free for personal projects
- **MongoDB Atlas**: $9/month for dedicated cluster
