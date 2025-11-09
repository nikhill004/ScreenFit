# Deployment Fix Guide

## Problem
Your app works locally but fails when deployed because environment variables aren't configured properly on Render and Vercel.

## Solution Steps

### 1. Render (Backend) Setup

Go to your Render dashboard → Your service → Environment

Add these environment variables:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/digital-wellness?retryWrites=true&w=majority
JWT_SECRET=generate-a-long-random-string-here
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Important:** Replace `your-app.vercel.app` with your actual Vercel domain.

### 2. Vercel (Frontend) Setup

Go to your Vercel dashboard → Your project → Settings → Environment Variables

Add this environment variable:

```
VITE_API_URL=https://your-app.onrender.com/api
```

**Important:** Replace `your-app.onrender.com` with your actual Render domain.

### 3. Redeploy Both Services

After setting environment variables:

1. **Render**: Will auto-redeploy when you push changes, or manually redeploy from dashboard
2. **Vercel**: Redeploy from dashboard or push to your connected git branch

### 4. Testing

1. Open browser console (F12) on your Vercel site
2. Try to signup/login
3. Check for CORS errors or network errors
4. Verify the API URL is correct in network tab

### Common Issues

**CORS Error:**
- Make sure `FRONTEND_URL` on Render matches your Vercel URL exactly
- Include `https://` in the URL

**API Not Found:**
- Verify `VITE_API_URL` on Vercel includes `/api` at the end
- Check Render logs to see if server is running

**MongoDB Connection Error:**
- Verify MongoDB URI is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Render's IP

### Debugging

**Check Render Logs:**
```
Go to Render Dashboard → Your Service → Logs
```

**Check Vercel Logs:**
```
Go to Vercel Dashboard → Your Project → Deployments → Click deployment → View Function Logs
```

**Test Backend Directly:**
```
curl https://your-app.onrender.com/api/health
```

Should return: `{"status":"ok","message":"Digital Wellness API is running"}`
