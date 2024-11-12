# Backend for 2FA with Single Device Access Control and Admin Dashboard

## Overview
This backend is designed to support a robust authentication system with two-factor authentication (2FA) and single-device access control. It also includes an admin dashboard for managing user activities and tasks. The backend is built using Node.js with Express and uses MongoDB as the database.

## Key Features
- **User Authentication**: Handles user signup and login, with password hashing and JWT token generation.
- **2FA Implementation**: Supports two-factor authentication for enhanced security.
- **Admin Dashboard**: Provides endpoints for admin users to manage other users and assign tasks.
- **Device Control**: Manages device sessions and enforces single-device login rules.
- **Task Management**: Admins can assign tasks to users, which are tracked in the database.

## Directory Structure
- **`app.js`**: Main application setup including middleware configurations.
- **`index.js`**: Entry point that starts the server.
- **`/config`**:
  - `db.js`: Configuration for MongoDB connection.
- **`/constants`**:
  - `constants.js`: Contains constants like database name.
- **`/controllers`**:
  - `auth.controllers.js`: Controllers for authentication-related operations.
  - `admin.controllers.js`: Controllers for admin-specific functionalities.
- **`/models`**:
  - `user.models.js`: Mongoose schema and model for users.
  - `admin.models.js`: Mongoose schema and model for admin tasks.
  - `login.models.js`: Mongoose schema and model for login attempts.
- **`/routes`**:
  - `auth.routes.js`: Routes related to authentication.
  - `admin.routes.js`: Routes accessible only to admins.
- **`/middlewares`**:
  - `auth.middlewares.js`: Middleware for authentication and role-based access control.

## Technologies Used
- **Node.js**: Runtime environment for the backend.
- **Express**: Framework used to build the backend.
- **MongoDB**: Database used to store user and admin data.
- **Mongoose**: ODM used to interact with MongoDB.
- **JWT**: Used for generating and verifying authentication tokens.
- **Bcrypt**: Used for hashing and checking passwords.
- **Joi**: Used for data validation.
- **dotenv**: Used to manage environment variables.

## API Endpoints
- **Auth Routes**:
  - POST `/api/v1/auth/signup`: Register a new user.
  - POST `/api/v1/auth/login`: Authenticate a user and return a JWT.
  - GET `/api/v1/auth/profile`: Fetch the authenticated user's profile.
- **Admin Routes**:
  - GET `/api/v1/admin/users`: Fetch all users (admin only).
  - POST `/api/v1/admin/assign-task`: Assign a task to a user (admin only).

## Security Measures
- Passwords are hashed using Bcrypt before storing in the database.
- JWTs are used to maintain user sessions and protect routes.
- CORS is enabled to restrict resources to trusted origins.
- Input validation is performed using Joi to prevent injection attacks.

## Future Enhancements
- Implement rate limiting to prevent brute force attacks.
- Add more detailed logging for monitoring and debugging.
- Extend the admin functionalities to include more detailed user management.