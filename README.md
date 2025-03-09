# Fullstack Challenge

## Project Overview
This is a full-stack application with React on the frontend and Node.js on the backend. It includes authentication, authorization, user management, and an admin dashboard.

## Installation and Setup

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
- User authentication and authorization are handled using JWT.
- Express validation is implemented for API request validation.

---

## User Roles and Features

### User Login
- Users can log in using their credentials.
- Users can edit their details.
- Default user password format: **First 4 letters of their name in uppercase + @123**  
  Example: For a user named **Ajith**, the password will be **AJIT@123**.

### Admin Login
- Admin has access to the dashboard.
- Admin can add new users.
- Admin can remove users.

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

## Technologies Used

### Frontend
- React.js
- Vercel (for deployment)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Swagger API Documentation

---

## Contributing
If you would like to contribute, feel free to submit a pull request.

---

## License
This project is licensed under the MIT License.

