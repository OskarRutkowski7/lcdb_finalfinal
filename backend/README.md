# LCDB Backend

This is the backend server for the LCDB (Local Community Database) application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lcdb
```

3. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Main server file
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   └── middleware/       # Custom middleware
├── .env                  # Environment variables
└── package.json          # Project dependencies
``` 