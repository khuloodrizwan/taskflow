🚀 TaskFlow: Team Activity & Performance Tracker

Project Overview

The TaskFlow: Team Activity & Performance Tracker is a full-stack web application designed to enhance productivity monitoring and performance analytics within a team. It provides a centralized platform for individual team members to log their daily tasks, measure their productivity, and view their activity history. For administrators, the application offers a powerful dashboard to oversee all team activities, track performance trends using interactive charts, and ensure project goals are met efficiently.

This application is built using the MERN (MongoDB, Express, React, Node) stack, offering real-time data synchronization and a robust, scalable architecture.

✨ Features

User Capabilities (Team Member)

Secure Authentication: User registration and JWT-based login/logout.

Activity Logging: A dedicated form to log daily activities with required fields:

Task Title: Short, descriptive name of the activity.

Description: Detailed notes on the task performed.

Hours Spent: Time duration dedicated to the task.

Productivity Score (1-5): A self-assessed score of how productive the user felt.

Personal Activity View: A dedicated dashboard to view, edit, or delete their own logged activities.

Performance Analytics: A personalized analytics page displaying charts and metrics based on their logged activities.

Administrator Capabilities

Admin Login: Separate, secure login for administrative users.

User Management: Ability to view a list of all registered team members.

Global Activity Overview: A dedicated page to view all activities logged by all users across the team.

Comprehensive Analytics Dashboard: Interactive charts and visualizations powered by Recharts (or similar) to analyze team performance:

Bar Charts: Total hours logged per user or per week.

Line Charts: Trend of average team productivity score over time.

Radar/Other Charts: Distribution of time spent across different task categories (if categorization is implemented).

⚙️ Tech Stack

Backend (API & Database)

Component

Technology

Description

Runtime

Node.js

JavaScript runtime environment for the server.

Framework

Express.js

Fast, unopinionated, minimalist web framework for Node.js.

Database

MongoDB

NoSQL document database for flexible and scalable data storage.

ODM

Mongoose

Elegant MongoDB object modeling for Node.js.

Authentication

JSON Web Tokens (JWT)

Secure, state-less token-based authentication.

Frontend (User Interface)

Component

Technology

Description



Library

React.js (Vite)

Frontend JavaScript library for building user interfaces.



Build Tool

Vite

Next-generation frontend tooling for fast development.



Routing

React Router

Declarative routing for React applications.



HTTP Client

Axios

Promise-based HTTP client for making API requests.



Charting

Recharts (or similar)

A composable charting library built on React components.



Styling

Tailwind CSS / MUI

Utility-first CSS framework or Material UI for responsive design and components.



📦 Installation and Setup

Follow these steps to set up and run the project locally.

Prerequisites

You must have the following software installed on your system:

Node.js (v18 or higher)

npm or yarn

MongoDB instance (local or remote/Atlas)

Step 1: Clone the Repository

Clone the project repository to your local machine using your specific GitHub link:

git clone [https://github.com/khuloodrizwan/taskflow.git](https://github.com/khuloodrizwan/taskflow.git)
cd taskflow


Step 2: Backend Setup

Navigate into the backend directory and install dependencies.

cd backend
npm install


Environment Variables (.env)

Create a file named .env in the backend directory and add the following variables:

# MongoDB Connection String (Update if using a remote server like Atlas)
MONGO_URI=mongodb://localhost:27017/team_tracker_db

# JWT Secret Key for token signing (REQUIRED for security - USE A LONG, RANDOM STRING)
JWT_SECRET=your_very_secure_secret_key_change_me_now

# Port for the backend server
PORT=5000


Step 3: Frontend Setup

Navigate into the frontend directory and install dependencies.

cd ../frontend
npm install


Environment Variables (Vite)

For Vite to correctly load the API base URL, you must create a file named .env in the root of the frontend/ directory.

Important Note: Frontend environment variables are publicly accessible. They must be prefixed with VITE_ (e.g., VITE_API_BASE_URL) for Vite to load them, and should only contain non-sensitive configuration values.

Create the file .env with the following content:

VITE_API_BASE_URL=http://localhost:5000/api


🔨 Project Structure

The project is organized into two primary, separate directories: backend (Node/Express API) and frontend (React application).

Backend Structure

backend/
├── controllers/         # Request handling logic for API endpoints
├── middlewares/         # Authentication/authorization checks
├── models/              # Mongoose schemas (User, Activity)
├── routes/              # API endpoints definitions (user, activities, admin)
├── utils/               # Helper functions and utilities
├── .env                 # Environment variables (private secrets)
├── db.js                # MongoDB connection and setup file
└── server.js            # Main entry point and server startup


Frontend Structure

frontend/
├── src/
│   ├── assets/          # Static files like images or fonts
│   ├── components/      # Reusable UI components (Buttons, Modals, Forms)
│   ├── context/         # React Context for global state management (AuthContext)
│   ├── pages/           # Page-level components (Login, Dashboard, Analytics, Admin)
│   ├── services/        # Logic for API calls and external services
│   ├── styles/          # Custom CSS or Tailwind base styles
│   ├── utils/           # Helper functions, formatters
│   ├── App.jsx          # Main application component and React Router setup
│   └── main.jsx         # Entry point for the Vite application
├── public/              # Static assets (favicons, images)
└── .env                 # Public environment variables (Vite requires this file)


▶️ Running the Project

1. Start the Backend Server

From the backend directory:

# Using nodemon for development (if installed)
npm run dev

# Or, using plain Node.js
node server.js


The backend server will start on the port defined in your .env file (e.g., http://localhost:5000).

2. Start the Frontend Application

From the frontend directory:

npm run dev


The React development server will start. You can access the application in your browser at the reported URL (typically http://localhost:5173).

📚 API Documentation

For a comprehensive list of all API endpoints, including HTTP methods, request body schemas, and response formats, please refer to the dedicated API documentation file.

See API.md for full API details.



Generate a professional README.md file for a Team Activity & Performance Tracker built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

Requirements for README:

Project Title & Description: Explain that this is a web app for team members to log daily activities and view performance analytics, and admin can view all team activities.

Features: Include user registration/login, admin login, activity logging (task title, description, hours spent, productivity score), user activity view, analytics page with charts (bar, line, radar), admin page to view all users and activities.

Tech Stack: Backend (Node.js, Express, MongoDB, Mongoose, JWT authentication), Frontend (React.js with Vite, React Router, Axios, Recharts or other chart library, Tailwind CSS/MUI).

Installation Instructions: Step-by-step guide to:

Clone the repository

Install backend dependencies (npm install)

Install frontend dependencies (npm install)

Setup environment variables (.env)

Start backend server (npm run dev or node server.js)

Start frontend server (npm run dev)

Running the Project: Explain how to access the app in the browser.

Project Structure: Show the folder structure for frontend and backend.

API Documentation: Include a short section stating “See API.md for full API details” (the detailed API documentation will be in a separate file).

Formatting Requirements:

Use Markdown with headers, bullet points, code blocks.

Make it professional, clear, and easy to read.

Focus on clarity and completeness, so anyone can set up and run the project.

Output:

A fully written README.md file ready to copy-paste.

2️⃣ API Documentation Prompt

Task for AI:
Generate a professional API.md file documenting all backend APIs of a Team Activity & Performance Tracker (MERN stack) project.

Requirements:

Include all APIs (auth, user, activity, analytics, admin).

For each API, provide:

Endpoint URL (e.g., POST /api/auth/login)

HTTP Method (GET, POST, etc.)

Description (what the API does)

Request Body (example JSON if applicable)

Response Body (example JSON)

Access / Authorization (Public, Private, Admin)

Optional notes: error messages, validation, or special instructions

Use Markdown formatting, including headers, bullet points, code blocks, and tables if needed.

Make it professional, clear, and complete, so any developer can understand and use the APIs without confusion.

Required Input:

List of all backend routes (endpoint, method, description, request/response examples, access type).

Output:

Fully written API.md file ready to copy-paste, documenting all project APIs.