const Model = require("../models/server.js");
const jwt = require("jsonwebtoken");

const AuthProtectRoute = async (req, res, next) => {
const token = req.cookies.token;
if(!token) {
    return res.status(401).json({ message: "Unauthorized - no token found"});
}
const decoded = await jwt.verify(token, process.env.JWT_SECRET);

if(!decoded) {
    return res.status(401).json({ message: "Unauthorized - invalid user" });
}

const user = await Model.User.findById(decoded._id);

if(!user) {
    return res.status(401).json({ message: "Unauthorized- user doesnt existed" });
}

req.user = user;

}

module.exports = {
    AuthProtectRoute
}