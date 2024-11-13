# Frontend for 2FA with Single Device Access Control and Admin Dashboard

## Overview
This is the frontend part of the project that integrates Two-Factor Authentication (2FA) with single-device access control, enhancing security by ensuring that only one device per user is active at any time. The system includes an admin dashboard for managing user activities, assigning tasks, and controlling device access.

## Key Features
- **User Authentication**: Secure signup and login processes with email and password.
- **Device Control**: Ensures that only one device per user remains active, requiring approval from the primary device for new logins.
- **Admin Dashboard**: Allows administrators to view and manage users, assign tasks, and monitor device activity.
- **Task Management**: Users can view and manage their tasks through a dedicated interface.

## Components and Pages

### Components
- **`TaskComponent`**: Displays individual tasks with a title and description.
- **`Navbar`**: Provides navigation links and user session management including a logout functionality.
- **`Footer`**: Displays social media links and copyright information.

### Pages
- **`LandingPage`**: The main entry page of the application, featuring a welcoming video background.
- **`UserProfile`**: Shows the user profile and provides a link to view personal tasks.
- **`TasksPage`**: Lists all tasks assigned to the user, utilizing the `TaskComponent`.
- **`AdminDash`**: The main interface for administrators to manage users and tasks.
- **`SignupPage`**: Allows new users to register.
- **`LoginPage`**: Handles user login.
- **`AdminDashboard`**: A landing page for administrators after login, providing a link to the admin dashboard functionalities.

## Routing
- Utilizes React Router for navigation between components and pages.
- Defined routes include paths to the landing page, admin dashboard, user profile, login, and signup pages.

## Backend Interaction
- Uses Axios for HTTP requests to handle user authentication, profile fetching, and task management.
- Interacts with a backend presumably running on `localhost:3000`.

## Security Features
- Implements 2FA for secure login from new devices.
- Stores authentication tokens in `localStorage` to manage sessions.

## Additional Considerations
- Ensure the backend supports CORS as the frontend makes cross-origin requests.
- Securely handle user data and authentication tokens to prevent XSS and CSRF attacks.

## Setup and Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Ensure the backend server is running on `localhost:5173` or update the frontend configuration accordingly.

## Technologies Used
- **React**: For building the user interface.
- **Axios**: Used for making API requests.
- **React Router**: For handling routing.
- **React Icons**: To enhance the UI with icons.
- **React Three Fiber**: Used for adding 3D rendering capabilities to the React application.