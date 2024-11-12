import { userModel, validateUser } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

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

        const authToken = jwt.sign({
            id: newUser._id,
            username: `${newUser.firstName}-${newUser.lastName}`.replace(/\s+/g, '-')
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
        newUser.currentSession = authToken;
        await newUser.save();

        res.status(201).json({
            message: 'User created and logged in successfully',
            authToken,
            user: {
                name: `${firstName} ${lastName}`,
                email,
                profilePic,
                primaryDevice,
                role: 'user',
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    const { email, password, token } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user || !await user.matchPassword(password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (user.isTwoFactorEnabled) {
            const verified = speakeasy.totp.verify({
                secret: user.twoFactor.secret,
                encoding: 'base32',
                token: token
            });

            if (!verified) {
                return res.status(400).json({ error: 'Invalid 2FA token' });
            }
        }

        const authToken = jwt.sign({
            id: user._id,
            username: `${user.firstName}-${user.lastName}`.replace(/\s+/g, '-')
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: 'Login successful',
            authToken,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const enableTwoFactor = async (req, res) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { secret, dataURL, otpURL } = await generateTwoFactorSecret(user);

    user.twoFactor.tempSecret = secret.base32;
    await user.save();

    res.json({ dataURL, otpURL });
};

async function generateTwoFactorSecret(user) {
    const secret = speakeasy.generateSecret({
        name: `YourAppName(${user.email})`
    });

    const dataURL = await QRCode.toDataURL(secret.otpauth_url);

    return {
        secret,
        dataURL,
        otpURL: secret.otpauth_url
    };
}


const showUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export { signup, login, enableTwoFactor, showUserProfile, getAllUsers };