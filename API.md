📚 TaskFlow API Documentation

This document provides a comprehensive overview of the backend API endpoints for the TaskFlow Team Activity & Performance Tracker application.

All endpoints are prefixed with /api. Authentication is handled via JSON Web Tokens (JWT) passed in the Authorization: Bearer <token> header for private routes.

1. Authentication Routes (/api/auth)

These endpoints are used for user registration and login, returning a JWT upon successful authentication.

1.1. Register User

Detail

Description

Endpoint

POST /api/auth/register

Access

Public

Description

Creates a new user account.

Request Body (JSON)

{
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "password": "securepassword123",
  "role": "user"
}


Successful Response (201 Created)

{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzFh...",
  "user": {
    "id": "631a7f0e...",
    "username": "jane_doe",
    "email": "jane.doe@example.com",
    "role": "user"
  }
}


Error Response (400 Bad Request)

{
  "message": "User with this email already exists."
}


1.2. Login User

Detail

Description

Endpoint

POST /api/auth/login

Access

Public

Description

Authenticates user credentials and returns a JWT.

Request Body (JSON)

{
  "email": "jane.doe@example.com",
  "password": "securepassword123"
}


Successful Response (200 OK)

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzFh...",
  "user": {
    "id": "631a7f0e...",
    "username": "jane_doe",
    "email": "jane.doe@example.com",
    "role": "user"
  }
}


Error Response (401 Unauthorized)

{
  "message": "Invalid email or password."
}


2. User & Admin Routes

2.1. Get All Users

Detail

Description

Endpoint

GET /api/user

Access

Private (Admin Only)

Description

Retrieves a list of all registered users in the system.

Successful Response (200 OK)

[
  {
    "_id": "631a7f0e...",
    "username": "admin_user",
    "email": "admin@taskflow.com",
    "role": "admin"
  },
  {
    "_id": "631a7f0f...",
    "username": "team_member_1",
    "email": "tm1@taskflow.com",
    "role": "user"
  }
]


Error Response (403 Forbidden)

{
  "message": "Access denied. Admin required."
}


3. Activity Routes (/api/activity)

These endpoints manage the logging and retrieval of individual work activities.

3.1. Add New Activity

Detail

Description

Endpoint

POST /api/activity

Access

Private (User/Admin)

Description

Logs a new activity for the authenticated user.

Request Body (JSON)

{
  "title": "Setup new feature branch",
  "description": "Configured database connection and initialized routes.",
  "hoursSpent": 3.5,
  "productivityScore": 4
}


Successful Response (201 Created)

{
  "message": "Activity logged successfully",
  "activity": {
    "_id": "631a80c1...",
    "title": "Setup new feature branch",
    "description": "Configured database connection and initialized routes.",
    "hoursSpent": 3.5,
    "productivityScore": 4,
    "user": "631a7f0e...",
    "date": "2023-10-27T08:00:00.000Z"
  }
}


3.2. Get User's Activities

Detail

Description

Endpoint

GET /api/activity/:userId

Access

Private (User/Admin)

Description

Retrieves all activities logged by a specific user ID.

Note

A regular user can only request their own ID. An Admin can request any user ID.

Successful Response (200 OK)

[
  {
    "_id": "631a80c1...",
    "title": "Setup new feature branch",
    "hoursSpent": 3.5,
    "productivityScore": 4,
    "date": "2023-10-27T08:00:00.000Z"
  },
  {
    "_id": "631a80c2...",
    "title": "Team Meeting",
    "hoursSpent": 1.0,
    "productivityScore": 3,
    "date": "2023-10-27T09:00:00.000Z"
  }
]


3.3. Get All Activities (Admin)

Detail

Description

Endpoint

GET /api/admin/all-activities

Access

Private (Admin Only)

Description

Retrieves all activity records from all users in the system.

Successful Response (200 OK)

[
  {
    "_id": "631a80c1...",
    "title": "Setup new feature branch",
    "hoursSpent": 3.5,
    "user": {
        "id": "631a7f0f...",
        "username": "team_member_1"
    }
  },
  {
    "_id": "631a80c3...",
    "title": "Reviewed PRs",
    "hoursSpent": 2.0,
    "user": {
        "id": "631a7f0e...",
        "username": "admin_user"
    }
  }
  // ... more activities
]


4. Analytics Routes (/api/analytics)

4.1. Get Weekly Analytics for User

Detail

Description

Endpoint

GET /api/analytics/:userId

Access

Private (User/Admin)

Description

Calculates and returns weekly performance metrics for a specific user, suitable for charts.

Note

A regular user can only request their own ID. Admin can request any user ID.

Successful Response (200 OK)

{
  "user": "631a7f0f...",
  "weeklySummary": [
    {
      "day": "Mon",
      "totalHours": 8.0,
      "avgProductivity": 4.1
    },
    {
      "day": "Tue",
      "totalHours": 7.5,
      "avgProductivity": 3.8
    },
    // ... continues for the last 7 days or full week
  ],
  "overallMetrics": {
    "totalActivities": 45,
    "averageHoursPerDay": 7.8,
    "averageProductivityScore": 4.05
  }
}


Error Response (404 Not Found)

{
  "message": "User not found or no
}




Generate a professional API.md file documenting all backend APIs for a Team Activity & Performance Tracker built with MERN stack (MongoDB, Express.js, React.js, Node.js).

Backend Routes to Include:

Auth Routes:

POST /api/auth/register → Register user (Public)

POST /api/auth/login → Login user (Public)

User Routes:

GET /api/user → Get all users (Private/Admin)

Activity Routes:

POST /api/activity → Add activity (Private)

GET /api/activity/:userId → Get activities of a specific user (Private)

GET /api/admin/all-activities → Get all activities (Admin only, Private/Admin)

Analytics Routes:

GET /api/analytics/:userId → Get weekly analytics for a user (Private)

For each API, include:

Endpoint URL

HTTP Method

Description – what the API does

Access / Authorization – Public, Private, or Admin

Request Body (example JSON if applicable)

Response Body (example JSON)

Optional Notes – error messages, validation rules, special instructions

Formatting Requirements:

Use Markdown with headers, code blocks, bullet points, and tables if necessary.

Make it professional, readable, and complete, so any developer can understand and use the APIs without confusion.

Include examples for all request/response scenarios (success, errors if relevant).

Output:

A fully written API.md file ready to copy-paste.

Cover all routes listed above and ensure accuracy for each endpoint.