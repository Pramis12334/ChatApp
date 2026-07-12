const Model = require("../models/server.js");

const registeruser = async (req, res) => {
    const { username, email, password } =req.body;
    if(!username || !email || !password) {
       return res.status(400).json({ message: "All fields are required"});
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)) {
       return res.status(400).json({ message: "Email must be valid"});
    }
    if(password.length < 6 && password.length>30){
        return res.status(400).json({ message: "Password must be greater than 6 and less than 30 characters"});
    }
    const user = await Model.User.findOne({ email });
    if(user) {
        return res.status(400).json({ message: "User already existed"});
    }

    const newuser = await Model.User.create({
        email,
        username,
        password
    });
    return res.status(201).json({ message: "User created successfully", newuser });
}

const loginuser = async (req, res) => {
    
    const { username, email, password } =req.body;
    return res.send("this is login page");
}

const logoutuser = async (req, res) => {
    return res.send("this is logout page");
}

module.exports = {
registeruser,
loginuser,
logoutuser
}