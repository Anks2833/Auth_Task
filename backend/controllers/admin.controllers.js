import { userModel } from '../models/user.models.js';
import { adminModel, validateAdmin } from '../models/admin.models.js';

const getUsers = async (_, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const tasks = await adminModel.find().populate('userId', 'firstName lastName');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const assignTask = async (req, res) => {
    const { userId, taskName, taskDetails } = req.body;

    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newTask = new adminModel({
            userId,
            taskName,
            taskDetails
        });

        await newTask.save();
        res.status(201).json({
            message: 'Task assigned successfully',
            taskName,
            taskDetails
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    getUsers,
    assignTask,
    getUserTasks
};