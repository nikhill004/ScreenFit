# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Verify your email

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (closest to you)
4. Name your cluster (or keep default)
5. Click "Create"

## Step 3: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Whitelist IP Address

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP for production
4. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open `server/.env`
2. Replace the MONGODB_URI with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add database name after `.net/`:
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/digital-wellness?retryWrites=true&w=majority
   ```

## Step 7: Install Dependencies & Run

```bash
cd server
npm install
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
🚀 Server running on http://localhost:3001
```

## Troubleshooting

**Connection Error:**
- Check username/password are correct
- Ensure IP is whitelisted
- Check connection string format

**Authentication Failed:**
- Verify database user credentials
- Make sure user has read/write permissions

**Network Error:**
- Check your internet connection
- Verify firewall isn't blocking MongoDB ports
