# Deployment Issues Checklist

## Problems Found & Solutions

### 🔴 Issue 1: CORS Configuration
**Problem**: Your Vercel URL is not in the allowed origins list on Render.

**Solution**:
1. Go to Render dashboard → Your service → Environment
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
   ⚠️ **Replace with your ACTUAL Vercel URL** (no trailing slash!)

3. Save and wait for Render to redeploy (30 seconds)

---

### 🔴 Issue 2: Frontend API URL Not Set
**Problem**: Vercel doesn't know your backend URL.

**Solution**:
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-render-app.onrender.com/api
   ```
   ⚠️ **Replace with your ACTUAL Render URL** (include `/api` at the end!)

3. Go to Deployments tab → Click "..." on latest → Redeploy

---

### 🔴 Issue 3: Render Free Tier Cold Start
**Problem**: Render spins down after 15 minutes of inactivity.

**Symptoms**: First request takes 30-60 seconds, then works fine.

**Solution**: This is normal on free tier. Options:
- Wait 30-60 seconds on first request
- Upgrade to paid plan ($7/month for always-on)
- Use a service like UptimeRobot to ping your API every 14 minutes

---

## Quick Test Commands

### Test Backend Health
```bash
curl https://your-render-app.onrender.com/api/health
```

Should return:
```json
{"status":"ok","message":"Digital Wellness API is running"}
```

### Test CORS (from browser console on Vercel site)
```javascript
fetch('https://your-render-app.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

---

## Environment Variables Checklist

### ✅ Render (Backend)
- [ ] `PORT` = 3001
- [ ] `JWT_SECRET` = (your secret key)
- [ ] `NODE_ENV` = production
- [ ] `MONGODB_URI` = (your MongoDB Atlas connection string)
- [ ] `FRONTEND_URL` = https://your-app.vercel.app ⚠️ **CRITICAL**

### ✅ Vercel (Frontend)
- [ ] `VITE_API_URL` = https://your-render-app.onrender.com/api ⚠️ **CRITICAL**

---

## Common Errors & Fixes

### Error: "Failed to fetch"
**Cause**: Backend is down or URL is wrong
**Fix**: 
- Check Render logs
- Verify VITE_API_URL in Vercel
- Test backend health endpoint

### Error: "CORS policy blocked"
**Cause**: FRONTEND_URL not set in Render
**Fix**: 
- Add FRONTEND_URL in Render environment variables
- Must match your Vercel URL exactly
- No trailing slash!

### Error: "Invalid credentials" (but works locally)
**Cause**: Different database or users not created
**Fix**: 
- Create new account on production
- Check MongoDB Atlas connection string is correct

### Error: Request takes 30+ seconds
**Cause**: Render cold start (free tier)
**Fix**: 
- This is normal, wait for it
- Subsequent requests will be fast
- Consider paid plan if needed

---

## Step-by-Step Deployment Fix

1. **Get Your URLs**:
   - Render URL: `https://digital-wellness-api.onrender.com` (example)
   - Vercel URL: `https://digital-wellness.vercel.app` (example)

2. **Update Render**:
   - Go to Render → Environment
   - Set `FRONTEND_URL` = `https://digital-wellness.vercel.app`
   - Save (auto-redeploys)

3. **Update Vercel**:
   - Go to Vercel → Settings → Environment Variables
   - Set `VITE_API_URL` = `https://digital-wellness-api.onrender.com/api`
   - Go to Deployments → Redeploy

4. **Test**:
   - Visit your Vercel URL
   - Open browser console (F12)
   - Try to sign up
   - Check for errors

5. **If Still Failing**:
   - Check Render logs for errors
   - Check browser console for CORS errors
   - Verify MongoDB connection in Render logs
   - Test backend health endpoint directly

---

## Need Help?

Share these details:
1. Your Render URL
2. Your Vercel URL
3. Error message from browser console (F12)
4. Error message from Render logs
