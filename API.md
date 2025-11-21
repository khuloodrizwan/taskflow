Complete API reference for Team Activity & Performance Tracker backend services.
Base URL: http://localhost:5000

🔐 Authentication APIs
Register User
httpPOST /api/auth/register
Access: Public
Request Body:
json{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
Response (201):
json{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Login User
httpPOST /api/auth/login
Access: Public
Request Body:
json{
  "email": "john@example.com",
  "password": "password123"
}
Response (200):
json{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

👤 User APIs
Get All Users
httpGET /api/users
```

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
Response (200):
json{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}

Get User by ID
httpGET /api/users/:id
```

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
Response (200):
json{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

📋 Activity APIs
Create Activity
httpPOST /api/activity
```

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
Request Body:
json{
  "user": "60d5ec49f1b2c72b8c8e4f1a",
  "title": "Complete frontend design",
  "description": "Design and implement the dashboard UI",
  "category": "Development",
  "priority": "high",
  "status": "in-progress",
  "duration": 3.5,
  "date": "2024-01-15"
}
Response (201):
json{
  "success": true,
  "message": "Activity created successfully",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "Complete frontend design",
    "description": "Design and implement the dashboard UI",
    "category": "Development",
    "priority": "high",
    "status": "in-progress",
    "duration": 3.5,
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T14:30:00.000Z"
  }
}

Get User Activities
httpGET /api/activity/:userId
```

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
Response (200):
json{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "user": {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "title": "Complete frontend design",
      "category": "Development",
      "priority": "high",
      "status": "completed",
      "duration": 3.5,
      "date": "2024-01-15T00:00:00.000Z"
    }
  ]
}

Get All Activities (Admin)
httpGET /api/admin/all-activities
```

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
Response (200):
json{
  "success": true,
  "count": 50,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "user": {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      },
      "title": "Complete frontend design",
      "category": "Development",
      "priority": "high",
      "status": "completed",
      "duration": 3.5
    }
  ]
}

📊 Analytics API
Get User Analytics
httpGET /api/analytics/:userId
```

**Access:** Private

**Headers:**
```
Authorization: Bearer <token>
Response (200):
json{
  "success": true,
  "totalActivities": 25,
  "totalHours": 87.5,
  "averageDuration": 3.5,
  "mostProductiveDay": "Mon",
  "dailyActivities": [
    {
      "date": "2024-01-15",
      "count": 3,
      "totalDuration": 8.5
    }
  ],
  "categoryBreakdown": [
    {
      "_id": "Development",
      "count": 15,
      "totalDuration": 45
    }
  ],
  "priorityBreakdown": [
    {
      "_id": "high",
      "count": 10
    }
  ],
  "statusBreakdown": [
    {
      "_id": "completed",
      "count": 20
    }
  ]
}
```

---

## 🔒 Authentication & Authorization

All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Access Levels:

Public: No authentication required
Private: Valid JWT token required
Admin: Valid JWT token + admin role required


⚠️ Error Responses
401 Unauthorized:
json{
  "success": false,
  "message": "Not authorized, no token provided"
}
403 Forbidden:
json{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
400 Bad Request:
json{
  "success": false,
  "message": "Please provide all required fields"
}
404 Not Found:
json{
  "success": false,
  "message": "User not found"
}
500 Server Error:
json{
  "success": false,
  "message": "Error creating activity",
  "error": "Detailed error message"
}

📝 Notes

All dates should be in ISO 8601 format
Duration is measured in hours (decimal allowed)
Category options: Development, Design, Testing, Meeting, Documentation, Research, Other
Priority options: low, medium, high
Status options: pending, in-progress, completed
Passwords are hashed using bcrypt before storage
JWT tokens expire after 7 days (configurable)