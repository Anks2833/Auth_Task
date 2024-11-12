import mongoose from 'mongoose';
import Joi from 'joi';

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    taskName: {
        type: String,
        required: true
    },
    taskDetails: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['assigned', 'in-progress', 'completed'],
        default: 'assigned'
    },
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);


const adminValidationSchema = Joi.object({
    userId: Joi.string().required(),
    taskName: Joi.string().required(),
    taskDetails: Joi.string().required(),
    status: Joi.string().valid('assigned', 'in-progress', 'completed').optional(),
});


const validateAdmin = (admin) => {
    return adminValidationSchema.validate(admin);
};

export { adminModel, validateAdmin };