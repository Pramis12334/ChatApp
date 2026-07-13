const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 async function hashingPassword(Password) {
   const hashedPassword = await bcrypt.hash(Password,10);
   return hashedPassword;
}

async function createToken(userId) {
    const token = await jwt.sign(userId, process.env.JWT_SECRET);
    return token;
}

module.exports = { hashingPassword, createToken }

