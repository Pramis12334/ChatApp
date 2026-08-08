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
        min: [ 1 ],
        max: [ 20 ]
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
    lastLogin: {
        type: Date,
        default: Date.now
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