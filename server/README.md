# Digital Wellness Backend

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:3001

## API Endpoints

### Authentication

**POST** `/api/auth/signup`
- Body: `{ name, email, password }`
- Returns: `{ token, user }`

**POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: `{ token, user }`

**GET** `/api/health`
- Health check endpoint
