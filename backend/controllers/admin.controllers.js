import { userModel } from '../models/user.models.js';
import { adminModel } from '../models/admin.models.js';

const getUsers = async (_, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const assignTask = async (req, res) => {
    const { userId, taskDetails } = req.body;

    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newTask = new adminModel({
            userId,
            taskDetails,
            taskName
        });

        await newTask.save();
        res.status(201).json({
            message: 'Task assigned successfully',
            taskDetails,
            taskName
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    getUsers,
    assignTask
};