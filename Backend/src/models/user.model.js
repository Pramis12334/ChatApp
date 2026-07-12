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
    }
}, { timestamps: true });

const User = mongoose.model("User",UserSchema);

module.exports = User;