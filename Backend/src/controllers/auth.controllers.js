
const Model = require("../models/server.js");
const cloudinary  = require("../services/cloudinary.js");
const { sendSingupEmail, sendResetPasswordEmail, sendVerificationEmail } = require("../services/email.services.js");
const userUtils = require("../utils/server.js");
const crypto = require('crypto');

const registeruser = async (req, res) => {
    try{
        const { username, email, password, isVerified, VerificationToken, resetPasswordToken, resetPasswordTokenExpired } =req.body;
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

    const verificationToken = await crypto.randomBytes(32).toString('hex');
    

    const newuser = await Model.User.create({
        email,
        username,
        password: hashedPassword,
        lastLogin: Date.now(),
        isVerified,
        VerificationToken: verificationToken,
        resetPasswordToken,
        resetPasswordTokenExpired
    });
    await newuser.save();
    await userUtils.generateToken(newuser._id, res);

    try {
        await sendSingupEmail(newuser.email, newuser.username, process.env.CLIENT_URL );
    } catch(error) {
        console.error("Error occur while sending Email", error);
        return res.status(500).json({message: "Email Service error"});
    };

    const verificationLink = `${process.env.CLIENT_URL}/verify-account/${verificationToken}`;
    

    try {
    await sendVerificationEmail(verificationLink, email, newuser.username);
    } catch(error) {
        console.error("Error occur while sending Email", error);
        return res.status(500).json({message: "Email Service error"});
    };

    return res.status(201).json({ message: "User created successfully", _id:newuser._id, email:newuser.email, username:newuser.username, profilepic: newuser.profilepic});

    } catch(error) {
        console.error("Error while creating user",error);
        return res.status(500).json({ message: "Internal Server Error in Registeruser Components"});
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

    newuser.lastLogin = Date.now()

    await user.save();

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

const userPasswordForgot = async (req, res) => {
    try{
        const { email } = req.body;

    const user = await Model.User.findOne({email});
    if(!user) {
        return res.status(404).json({ message: "Invalid Email"});
    }
    
    const resetToken = await crypto.randomBytes(32).toString('hex');
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpired = Date.now() + 3600000;

    await user.save();
    
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`;

    try{
        await sendResetPasswordEmail(email,user.username,resetLink);
    } catch(error) {
        console.log("Email server Error");
        return res.status(500).json({ message: "Email server Error", error});
    }
    return res.status(200).json({ message: "Password reset link sent successfully"});
    } catch(error) {
        console.log("UserForgotPassword Controllers Error");
        res.status(500).json({ message: "Internal Server Error"})
    }
}

const userPasswordChange = async (req, res) => {
 try{
    const {resetLink} = req.params;
    const {password} = req.body;

    if(!resetLink || !password) {
        return res.status(404).json("Invalid typo");
    }

    const user = await Model.User.findOne({
        resetPasswordToken: resetLink,
        resetPasswordTokenExpired: {$gt: Date.now()}
    });

    if(!user) {
        return res.status(404).json({ message: "Invalid or expired token"});
    }

    user.password = await userUtils.hashingPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpired = undefined;

    await user.save();

    res.status(200).json({ message: "Password changed successfully"});

 } catch(error) {
    console.log("Error while changing User Password");
    return res.status(500).json({ message: "Internal Server Error"});
 }
}

const userVerification = async(req, res) => {
   try {
     const {verificationToken} = req.params;
     
    if(!verificationToken) {
        return res.status(400).json({message: "Provide Verification Token"});
    }
    
    const user = await Model.User.findOne({
        VerificationToken: verificationToken
    });
    
    if(!user || user.isVerified) {
        return res.status(404).json({message: user.isVerified ? "User already verified" : "Invalid VerificationToken" });
    }
    user.isVerified = true;
    await user.save();
    console.log(user);
    return res.status(200).json({ message: "User verified successfully"});
   } catch (error) {
    console.log("Verification controller error");
    return res.status(500).json({ message: "Internal Server Error"});
   }
}
module.exports = {
registeruser,
loginuser,
logoutuser,
updateProfile,
userPasswordForgot,
userPasswordChange,
userVerification
}