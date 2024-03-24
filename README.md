# Real-Time Customer Feedback Portal

The Real-Time Customer Feedback Portal is a modern web application designed to facilitate seamless communication between customers and service providers. Built with cutting-edge technologies, this portal aims to enhance customer satisfaction by allowing users to submit feedback in real-time and view all feedback instantaneously. The platform employs a robust backend powered by Node.js, Express, and a mongodb database solution, while the frontend is crafted using React.js to ensure a responsive and intuitive user experience.

# SETUP
step 1: Go to project directory
step 2: cd backend
step 3: npm install
step 4 : open another powershell and do cd frontend
step 4: npm install
step 5: make sure server is running . your website will be ready on  http://localhost:3000   

# Feedback Portal API Documentation
Welcome to the Feedback Portal API documentation. This guide provides detailed information about the available API endpoints, their functionalities, required parameters, and expected responses.

Base URL
All API endpoints are prefixed with the following base URL: http://localhost:5000/api

Authentication Endpoints
# 1. Login
Endpoint: /auth/login

Method: POST

Purpose: Authenticate a user and generate a JWT token for subsequent requests.

Request Body:

{
  "username": "example_user",
  "password": "example_password"
}
Successful Response:

{
  "token": "JWT_TOKEN_HERE",
  "userId": "65ffe29bd12e9050357f1a58"
}
# 2. Register
Endpoint: /auth/register

Method: POST

Purpose: Register a new user.

Request Body:

{
  "username": "new_user",
  "password": "new_password"
}
Successful Response:

{
  "message": "User registered successfully"
}
Feedback Endpoints
# 3. Submit Feedback
Endpoint: /feedback/submit

Method: POST

Purpose: Allow users to submit feedback messages.

Request Body:

{
  "message": "User feedback message"
}
Successful Response:

{
  "_id": "feedback_id",
  "message": "User feedback message",
  "createdAt": "timestamp_here"
}
# 4. Get All Feedback
Endpoint: /feedback/all

Method: GET

Purpose: Retrieve all feedback messages.

Successful Response:


[
  {
    "_id": "feedback_id_1",
    "message": "Feedback message 1",
    "createdAt": "timestamp_1"
  },
  {
    "_id": "feedback_id_2",
    "message": "Feedback message 2",
    "createdAt": "timestamp_2"
  }
]
# 5. Get Feedback by User ID
Endpoint: /feedback/:userId

Method: GET

Purpose: Retrieve feedback messages submitted by a specific user.

URL Parameters:

userId: Unique identifier of the user.
Successful Response:

[
  {
    "_id": "feedback_id_1",
    "message": "Feedback message 1",
    "createdAt": "timestamp_1"
  }
]
# 6. Send Admin Message
Endpoint: /feedback/admin-message

Method: POST

Purpose: Allow admins to send messages to specific users.

Request Body:

{
  "user": "65ffe29bd12e9050357f1a58",     //user id of user to whom we want to send message
  "message": "Your admin message"
}
Successful Response:

{
  "_id": "admin_message_id",
  "message": "Your admin message",
  "createdAt": "timestamp_here"
}




