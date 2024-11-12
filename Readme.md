# 2FA with Single Device Access Control and Admin Dashboard

## Overview
This system integrates Two-Factor Authentication (2FA) with single-device access control. When a user logs in on a new device, the primary device (where the user logged in first) receives a notification to approve or reject the login attempt. If approved, the new device becomes the primary, and the old device is automatically logged out. The admin dashboard enables administrators to manage user activity, assign tasks, and control device access.

## Key Features

### 1. Signup & Login System
- **Signup**: Users create an account using their email and password. The password is securely hashed before being stored in the database.
- **Login**: Users can log in with their email and password. If they log in from a new device, the primary device must approve the login. Only one device is allowed to stay active at any time.

### 2. Primary Device Recognition
- The first device a user logs in with becomes the primary device.
- If the same email is used to log in from another device, a notification is sent to the primary device for approval.
- The user can accept or reject the login on the primary device.
- On approval, the primary device is logged out, and the new device takes over as the primary.

### 3. 2FA Notification
- When a user logs in from a new device, the primary device is notified via email, SMS, or push notification.
- The primary device has the option to accept or reject the login attempt.
- The 2FA notification system ensures that users always maintain control over their accounts and can prevent unauthorized access.

### 4. Single Device Access Control
- Only one device can be logged in at any time. Logging in from a new device triggers the logout of the current primary device.
- This enhances security by limiting account access to one active session.

### 5. Admin Dashboard
- The admin dashboard provides an overview of user activities, including device logs and current active devices.
- Admins can:
  - View a list of users and their current primary devices.
  - Monitor login activity and session details.
  - Assign realty tasks or other assignments to users.
  - Revoke or change device access for specific users if necessary.

## Database Structure

- **Users Collection**: Stores user information such as email, password, and the details of their primary device (device ID, device name, last login time).
- **Login Attempts Collection**: Keeps track of login attempts, including device information, login status (pending, approved, rejected), and the time of the attempt.
- **Admin Tasks Collection**: Records tasks assigned to users by the admin (e.g., realty tasks), including task details and status (assigned, in-progress, completed).

## Backend Flow (Node.js, Express)

1. **User Signup**:
   - User submits email and password.
   - The password is hashed and saved, and a user record is created in the database.
2. **Login Process**:
   - User logs in with email and password.
   - If the device matches the primary device, login proceeds.
   - If the device is new, a notification is sent to the primary device, and the login attempt is marked as "pending."
   - The user on the primary device approves or rejects the attempt.
3. **Approval/Reject Flow**:
   - If approved, the new device becomes the primary device, and the old device is logged out.
   - If rejected, the login attempt is blocked.
4. **Admin Functionality**:
   - Admins can view users and manage device access through the dashboard.
   - Admins can assign tasks to users, manage tasks, and track progress.

## Frontend Flow (React or Vue.js)

1. **Login Interface**:
   - Users input their email and password to log in.
   - If logging in from a new device, they are notified that approval is required from their primary device.
2. **Admin Dashboard Interface**:
   - Displays a list of users and their current active sessions.
   - Admins can assign tasks, monitor login sessions, and manage device access.

## Additional Considerations

- **Security**: Ensure secure password storage with hashing (e.g., bcrypt) and use of HTTPS.
- **Notification Service**: Use an appropriate notification mechanism (email, SMS, or push notifications) for login approval requests.
- **Session Management**: Implement token-based authentication (e.g., JWT) for handling active sessions.

## Summary
The 2FA system ensures that only one device is logged in at any time and allows the user to approve new login attempts from their primary device. Admins can manage user sessions and assign tasks via the dashboard, providing both security and user management functionalities.