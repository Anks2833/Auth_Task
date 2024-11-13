import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    profilePic: {
        type: String,
        default: 'defaultProfilePic.png',
    },
    password: {
        type: String,
        required: true,
    },
    twoFactor: {
        secret: String,
        tempSecret: String,
        dataURL: String,
        otpURL: String,
    },
    isTwoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    primaryDevice: {
        type: String,
        default: null,
    },
    currentSession: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userValidationSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    profilePic: Joi.string().uri().optional(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords must match',
    }),
    role: Joi.string().valid('user', 'admin').optional(),
});

const validateUser = (user) => {
    return userValidationSchema.validate(user);
};

const userModel = mongoose.model('User', userSchema);

export { userModel, validateUser };