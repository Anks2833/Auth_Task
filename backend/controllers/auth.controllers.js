import { userModel, validateUser } from '../models/user.models.js';
import { loginAttemptModel } from '../models/login.models.js';
import jwt from 'jsonwebtoken';

// Signup Controller
const signup = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { firstName, lastName, email, password, profilePic, primaryDevice } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password,
            profilePic,
            primaryDevice,
        });

        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            name: `${firstName} ${lastName}`,
            email,
            profilePic,
            primaryDevice,
            role: 'user',
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password, deviceId, deviceName } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        // Check if the device is new
        if (user.primaryDevice.deviceId !== deviceId) {
            // Create a login attempt
            const loginAttempt = new loginAttemptModel({
                userId: user._id,
                deviceId,
                status: 'pending',
            });
            await loginAttempt.save();

            // Here you would send a notification to the primary device
            // (e.g., via email, SMS, or push notification)

            return res.status(401).json({ message: 'Login attempt pending approval on primary device' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.currentSession = token; // Store the current session token
        await user.save();
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Approve Login Controller
const approveLogin = async (req, res) => {
    const { userId, deviceId } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update primary device
        user.primaryDevice = {
            deviceId,
            deviceName: req.body.deviceName, // Assuming deviceName is sent in the request
            lastLogin: new Date(),
        };
        user.currentSession = null; // Clear any previous session
        await user.save();

        // Log out the previous device (if needed)
        // Here you can implement logic to invalidate the previous session

        res.status(200).json({ message: 'Login approved, device is now primary' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Reject Login Controller
const rejectLogin = async (req, res) => {
    const { userId, deviceId } = req.body;

    try {
        const loginAttempt = await loginAttemptModel.findOneAndUpdate(
            { userId, deviceId },
            { status: 'rejected' },
            { new: true }
        );

        if (!loginAttempt) return res.status(404).json({ error: 'Login attempt not found' });

        res.status(200).json({ message: 'Login attempt rejected' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    signup,
    login,
    approveLogin,
    rejectLogin
};