import { adminModel } from '../models/admin.models.js';

export const getUserSpecificTasks = async (req, res) => {
    try {
        const tasks = await adminModel.find({ userId: req.user._id });
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};