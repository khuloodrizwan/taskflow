Team Activity & Performance Tracker
A full-stack web application built with the MERN stack that enables team members to log daily activities, track performance metrics, and provides administrators with comprehensive team oversight through analytics dashboards.
📋 Overview
This application allows users to:

Register and authenticate securely
Log daily activities with details (title, description, category, priority, status, duration)
View personal activity history and statistics
Analyze performance with interactive charts
(Admin) Monitor all team members and their activities

✨ Features
User Features

Authentication: Secure registration and login with JWT tokens
Activity Logging: Record tasks with title, description, category, priority, status, and time spent
Personal Dashboard: View activity statistics and recent tasks
Analytics: Visualize weekly performance with bar, line, and radar charts
Activity Management: Track activities by category, priority, and completion status

Admin Features

User Management: View all registered users and their roles
Team Overview: Monitor all team activities across users
Advanced Analytics: Access comprehensive statistics and completion rates
Search & Filter: Find activities by status, priority, or search terms

🛠️ Tech Stack
Backend

Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - ODM for MongoDB
JWT - Authentication
bcryptjs - Password hashing

Frontend

React.js - UI library
Vite - Build tool
React Router - Navigation
Axios - HTTP client
Recharts - Data visualization
CSS3 - Styling

📦 Installation
Prerequisites

Node.js (v14 or higher)
MongoDB (local or Atlas)
npm or yarn

1. Clone Repository
bashgit clone <repository-url>
cd team-activity-tracker
2. Backend Setup
bash# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
Configure .env file:
envPORT=5000
MONGO_URI=mongodb://localhost:27017/team-tracker
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-tracker

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
3. Frontend Setup
bash# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env
🚀 Running the Project
Start Backend Server
bashcd backend
npm run dev
# Server runs on http://localhost:5000
Start Frontend Server
bashcd frontend
npm run dev
# App runs on http://localhost:3000
```

### Access the Application
Open your browser and navigate to: **http://localhost:3000**

### Default Login Credentials
After registering, you can create an admin user by setting `role: 'admin'` during registration.

## 📁 Project Structure
```
team-activity-tracker/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── activityController.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── activityModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── activityRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ActivityItem.jsx
    │   │   ├── ActivityList.jsx
    │   │   ├── AnalyticsCharts.jsx
    │   │   └── Loader.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ActivityForm.jsx
    │   │   ├── Analytics.jsx
    │   │   └── AdminPage.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── activityService.js
    │   │   └── userService.js
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── formatDate.js
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
📚 API Documentation
For detailed API documentation including endpoints, request/response formats, and authentication requirements, see API.md.
🔐 Authentication
The application uses JWT (JSON Web Tokens) for authentication:

Tokens are stored in localStorage
Protected routes require valid JWT in Authorization header
Admin routes require both valid JWT and admin role

🎨 Key Features Implementation
Activity Tracking

Categories: Development, Design, Testing, Meeting, Documentation, Research, Other
Priorities: Low, Medium, High
Status: Pending, In Progress, Completed

Analytics Dashboard

Daily activity count (last 7 days)
Total hours tracked
Category breakdown (radar chart)
Priority & status distribution

Admin Dashboard

Overview statistics
User management table
All activities with search/filter
Real-time activity monitoring

🐛 Troubleshooting
Backend won't start:

Check MongoDB connection in .env
Ensure port 5000 is not in use

Frontend can't connect to backend:

Verify VITE_API_URL in frontend .env
Check CORS settings in backend

Login issues:

Clear browser localStorage
Check JWT_SECRET is set in backend .env

📄 License
This project is open source and available under the MIT License.
👥 Contributors
Built as a MERN stack learning project.