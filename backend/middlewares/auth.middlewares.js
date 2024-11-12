import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.models.js';

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Access denied. No user found.' });
    }

    
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. User is not an admin.' });
    }

    next();
};

export { authenticateToken, isAdmin };