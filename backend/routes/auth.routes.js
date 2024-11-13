import express from 'express';
import { signup, login, enableTwoFactor, showUserProfile, getAllUsers } from '../controllers/auth.controllers.js';
import { authenticateToken } from '../middlewares/auth.middlewares.js';
import { getUserSpecificTasks } from '../controllers/tasks.controllers.js';
import { approveDeviceLogin } from '../controllers/auth.controllers.js';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);

router.post('/enable-two-factor', authenticateToken, enableTwoFactor);

router.get('/users', getAllUsers);
router.get('/profile', authenticateToken, showUserProfile);

router.get('/my-tasks', authenticateToken, getUserSpecificTasks);

router.post('/approve-device-login', authenticateToken, approveDeviceLogin);

export default router;