# Backend for 2FA with Single Device Access Control and Admin Dashboard

## Overview
This backend service supports a robust authentication system with Two-Factor Authentication (2FA) and single-device access control. It also includes an admin dashboard for managing user activities, assigning tasks, and controlling device access.

## Key Features
- **User Authentication**: Secure signup and login processes with email and password, including JWT for session management.
- **Two-Factor Authentication (2FA)**: Enhances security by requiring a second form of verification.
- **Device Control**: Manages device sessions to ensure that only one device per user remains active, requiring approval from the primary device for new logins.
- **Admin Dashboard**: Allows administrators to view and manage users, assign tasks, and monitor device activity.
- **Task Management**: Admins can assign tasks to users and users can view their specific tasks.

## Technologies Used
- **Node.js**: The runtime environment for the backend.
- **Express**: The web application framework.
- **MongoDB**: The database used, with Mongoose as the ODM.
- **JWT (JSON Web Tokens)**: For secure transmission of information as a JSON object.
- **Bcrypt**: For hashing and securing passwords.
- **Joi**: For data validation.
- **Speakeasy**: For handling Two-Factor Authentication.
- **QRCode**: To generate QR codes for 2FA.
- **Dotenv**: To manage environment variables.
- **Cors**: To enable CORS (Cross-Origin Resource Sharing).

## Setup and Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anks2833/Auth_Task.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd path/to/backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=<your_port_number>
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

## Running the Server
- **Development mode**:
  ```bash
  npm run dev
  ```

## API Endpoints

### Authentication Routes
- `POST /api/v1/auth/signup`: Register a new user.
- `POST /api/v1/auth/login`: Authenticate a user.
- `POST /api/v1/auth/enable-two-factor`: Enable 2FA for a user.
- `GET /api/v1/auth/profile`: Fetch the profile of the logged-in user.
- `GET /api/v1/auth/users`: Fetch all users (admin only).
- `POST /api/v1/auth/approve-device-login`: Approve or reject a new device login request.

### Admin Routes
- `GET /api/v1/admin/users`: Fetch all users (admin only).
- `POST /api/v1/admin/assign-task`: Assign a task to a user (admin only).
- `GET /api/v1/admin/tasks`: Fetch all tasks (admin only).

###