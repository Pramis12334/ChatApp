const Model = require("../models/server.js");
const cloudinary  = require("../services/cloudinary.js");
const { sendSingupEmail } = require("../services/email.services.js");
const userUtils = require("../utils/server.js");

const registeruser = async (req, res) => {
    try{
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
    const hashedPassword = await userUtils.hashingPassword(password);

    const newuser = await Model.User.create({
        email,
        username,
        password: hashedPassword
    });
    await newuser.save();

    userUtils.generateToken(newuser._id, res);

    try {
        await sendSingupEmail(newuser.email, newuser.username, process.env.CLIENTURL );
    } catch(error) {
        console.error("Error occur while sending Email", error);
    };

    
   
    return res.status(201).json({ message: "User created successfully", newuser:{ _id:newuser._id, email:newuser.email, username:newuser.username, profilepic: newuser.profilepic}});

    } catch(error) {
        console.error(error);
    }
}

const loginuser = async (req, res) => {
    
   try{ 
    const { email, password } =req.body;
    if(!email || ! password ) {
        return res.status(400).json({message: "Both of the fields is required" });
    }
    const newuser = await Model.User.findOne({ email }).select("+password");
    
    if(!newuser) {
        res.status(400).json({ message: "User doesnt existed" });
    }
    userUtils.comparePassword(password, newuser.password, res);
    userUtils.generateToken(newuser._id, res);

   } catch(error) {
    return res.status(500).json({ message: "Error occur", error});
   }

}

const logoutuser = async (_, res) => {
    res.cookie("token", "");
    res.status(200).json({message: "Logged out successfully" });
}

const updateProfile = async( req, res) => {
   try {
     const userId = req.user._id;
     const profilepic = req.file;
     console.log(profilepic);
     
     if(!profilepic) {
        return res.status(401).json({ message: "Profilepic is required:" });
     }
     const updatedUser = await Model.User.findByIdAndUpdate(userId,{profilepic: profilepic.path},{new: true});
     if(!updatedUser) {
        return res.status(400).json({ message: "Some error occur while updating"});
     }
    return res.status(200).json({ message: "User updated successfully" }, updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error});
    }
}

module.exports = {
registeruser,
loginuser,
logoutuser,
updateProfile
}