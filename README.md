# Fullstack Challenge

## Project Overview
This full-stack application provides user authentication and authorization, allowing users to sign up, log in, edit details, and perform admin-level actions such as managing users. The backend is built with Node.js and Express, while the frontend uses React.

## Setup Instructions

### Frontend (React)

#### Prerequisites
- Node.js (v16 or later)
- npm or yarn

#### Steps to Install and Run
```sh
# Clone the repository
git clone <repo_url>

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

#### Deployment
The React project is deployed on Vercel: [Live Demo](https://fullstack-challenge-kappa.vercel.app/login)

---

### Backend (Node.js + Express)

#### Prerequisites
- Node.js (v16 or later)
- MongoDB (Local or Cloud Instance)

#### Steps to Install and Run
```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

#### API Documentation
Swagger is implemented at `/api-docs`.

#### Authentication & Authorization
- JWT-based authentication
- Express validation for request handling
- Role-based access control

---

## API Documentation

### Authentication Endpoints

#### **Sign Up** - `POST /v1/signup`
- Registers a new user
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- Responses:
  - `201`: User registered successfully
  - `400`: Invalid input

#### **Sign In** - `POST /v1/signin`
- Logs in a user
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- Responses:
  - `200`: Login successful
  - `401`: Unauthorized

### User Endpoints

#### **Get User Details** - `GET /v1/userDetails`
- Fetches authenticated user's details
- Requires Bearer token
- Responses:
  - `200`: User details retrieved
  - `401`: Unauthorized

#### **Update User Details** - `PUT /v1/updateUser`
- Updates user's profile
- Request body:
  ```json
  {
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
  ```
- Responses:
  - `200`: User updated successfully
  - `401`: Unauthorized

### Admin Endpoints

#### **Fetch All Users** - `GET /v1/users`
- Retrieves all users (Admin only)
- Requires Bearer token
- Responses:
  - `200`: List of users
  - `403`: Forbidden

#### **Delete User** - `DELETE /v1/user/{userId}`
- Deletes a user (Admin only)
- Requires Bearer token
- Responses:
  - `200`: User deleted successfully
  - `403`: Forbidden

---

## Technology Stack Used

### Frontend
- React.js
- Chakra UI
- Vercel (Deployment)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Swagger API Documentation
- Express-rate-limit (For rate limiting authentication requests)

---

## Assumptions Made
- Default user password format: **First 4 letters of their name in uppercase + @123**  
  Example: For a user named **Ajith**, the password will be **AJIT@123**.
- Only admins can access the user management endpoints (`/v1/users` and `/v1/user/{userId}`).
- The authentication system uses JWT for secure user sessions.
- Rate limiting is applied to authentication routes (`/v1/signup` and `/v1/signin`) to prevent abuse.

---

## Environment Variables

Create a `.env` file in the backend directory and configure the following variables:

```
# ENC CONFIG
NODE_ENV=development
ENCRYPTION_SECRET=12345678
ENCRYPTION_SALT_ROUNDS=10
COMMON_SECRET_KEY=FULL_STACK_SECRET_KEY
PORT=5050
MONGO_URI=<your_mongodb_url>

# AWS
JWT_SECRET=1215e947d0339569007cc9c853812b0f2fe8aa594ea92eba3672d308d0049a45
CLIENT=
NODE_MAILER_API_KEY=<your_node_mailer_api_key>
```

---

## Contributing
If you would like to contribute, feel free to submit a pull request.

---

## License
This project is licensed under the MIT License.

