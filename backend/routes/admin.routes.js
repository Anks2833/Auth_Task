import express from 'express';
import { getUsers, assignTask, getUserTasks } from '../controllers/admin.controllers.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/users', authenticateToken, isAdmin, getUsers);
router.post('/assign-task', authenticateToken, isAdmin, assignTask);
router.get('/tasks', authenticateToken, isAdmin, getUserTasks);

export default router;