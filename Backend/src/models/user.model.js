const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    profilepic: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    VerificationToken: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpired: Date,
}, { timestamps: true });

const User = mongoose.model("User",UserSchema);

module.exports = User;