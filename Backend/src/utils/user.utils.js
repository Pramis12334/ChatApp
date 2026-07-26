const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 async function hashingPassword(Password) {
   const hashedPassword = await bcrypt.hash(Password,10);
   return hashedPassword;
}

const generateToken = async (userId, res) => {
    const token = await jwt.sign({userId: userId}, process.env.JWT_SECRET);
    res.cookie("token", token);
}

const comparePassword = async (Password,DbPassword) => {
    const verified = await bcrypt.compare(Password,DbPassword);
    return verified;
}

module.exports = { hashingPassword, generateToken, comparePassword }

