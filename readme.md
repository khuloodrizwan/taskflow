# Team Activity & Performance Tracker

Full-stack MERN application for activity tracking and performance analytics.

## Features
- User authentication (JWT)
- Activity logging with categories, priorities, and status
- Personal dashboard with statistics
- Weekly analytics with charts (bar, line, radar)
- Admin dashboard for user and activity management

## Tech Stack
**Backend:** Node.js, Express, MongoDB, JWT  
**Frontend:** React, Vite, React Router, Axios, Recharts

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/team-tracker
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### Frontend Setup
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:5000" > .env
```

## Running the Project

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Access:** http://localhost:3000

## Project Structure
```
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
└── server.js

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
└── package.json
```

## API Docs
See [API.md](./API.md) for complete endpoint documentation.

## Authentication
Uses JWT tokens stored in localStorage. Admin routes require `role: 'admin'`.
