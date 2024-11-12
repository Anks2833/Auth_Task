import mongoose from 'mongoose';
import Joi from 'joi';

const loginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deviceId: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const loginAttemptModel = mongoose.model('LoginAttempt', loginSchema);

const loginValidationSchema = Joi.object({
    userId: Joi.string().required(),
    deviceId: Joi.string().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
});

const validateLoginAttempt = (loginAttempt) => {
    return loginValidationSchema.validate(loginAttempt);
};

export { loginAttemptModel, validateLoginAttempt };