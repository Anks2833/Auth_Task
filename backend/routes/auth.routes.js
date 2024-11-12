import express from 'express';
import { signup, login, approveLogin, rejectLogin } from '../controllers/auth.controllers.js';
import { authenticateToken } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/approve-login', authenticateToken, approveLogin);
router.post('/reject-login', authenticateToken, rejectLogin);

export default router;