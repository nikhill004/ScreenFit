# Digital Wellness - Setup Guide

## Quick Start

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
npm run dev
```
Backend runs on http://localhost:3001

### 3. Start Frontend (in new terminal)
```bash
npm run dev
```
Frontend runs on http://localhost:8080

## Features Implemented

### ✅ Authentication
- Sign up with name, email, password
- Login with email, password
- JWT token-based auth
- Protected routes (redirects to login if not authenticated)
- Logout functionality

### ✅ Task Management with localStorage
- Add tasks with title and estimated time
- Mark tasks as complete/incomplete
- Delete tasks
- View time saved by completing tasks
- Task statistics (total, completed, pending)
- Data persists in browser localStorage

### ✅ UI/UX
- Modern gradient login/signup pages
- User greeting in header
- Logout button
- Toast notifications for actions
- Responsive design

## Usage

1. Go to http://localhost:8080
2. You'll be redirected to `/login`
3. Click "Sign up" to create an account
4. After signup, you're auto-logged in
5. Navigate to "Tasks" tab
6. Add tasks with estimated time in minutes
7. Check them off as you complete them
8. See your time saved stats

## Tech Stack

**Frontend:**
- React + TypeScript
- React Router (protected routes)
- localStorage for task persistence
- ShadCN UI components
- Tailwind CSS

**Backend:**
- Express.js
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- In-memory user storage (replace with DB for production)

## Notes

- User data is stored in-memory on the backend (resets on server restart)
- Tasks are stored in browser localStorage (persists across sessions)
- Token expires in 7 days
- Backend runs on port 3001, frontend on 8080
