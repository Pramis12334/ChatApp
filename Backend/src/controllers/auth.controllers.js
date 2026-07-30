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
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be greater than 6"});
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
    await userUtils.generateToken(newuser._id, res);

    try {
        await sendSingupEmail(newuser.email, newuser.username, process.env.CLIENTURL );
    } catch(error) {
        console.error("Error occur while sending Email", error);
        res.status(500).json({message: "Email Service error"});
    };

    return res.status(201).json({ message: "User created successfully", _id:newuser._id, email:newuser.email, username:newuser.username, profilepic: newuser.profilepic});

    } catch(error) {
        console.error("Error while creating user",error);
        res.status(500).json({ message: "Internal Server Error in Registeruser Components"});
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
        return res.status(400).json({ message: "User doesnt existed" });
    }

    const isPasswordCorrect = await userUtils.comparePassword(password, newuser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Your credentials doesnt match" });
    }

    await userUtils.generateToken(newuser._id, res);

    return res.status(200).json({ message: "You have logged in successfully", _id: newuser._id, email: newuser.email, username: newuser.username, profilepic: newuser.profilepic });

   } catch(error) {
    return res.status(500).json({ message: "Error occur while logging in", error});
   }

}

const logoutuser = async (_, res) => {
    try{ 
         res.cookie("token", "");
         res.status(200).json({message: "Logged out successfully" });
    } catch(error) {
        console.error("Error while Logging out", error.message);
    }
   
}

const updateProfile = async( req, res) => {
   try {
     const userId = req.user._id;
     const profilepic = req.file;
     if(!profilepic) {
        return res.status(406).json({ message: "Profilepic is required:" });
     }
     const updatedUser = await Model.User.findByIdAndUpdate(userId,{profilepic: profilepic.path},{new: true});
     if(!updatedUser) {
        return res.status(400).json({ message: "Some error occur while updating"});
     }
    return res.status(200).json({ message: "User updated successfully", profilepic: updatedUser.profilepic, username: updatedUser.username, _id: updatedUser._id, email: updatedUser.email });
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