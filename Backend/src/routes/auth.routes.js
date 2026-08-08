const express = require('express');
const Controllers = require('../controllers/server');
const { AuthProtectRoute } = require('../middlewares/auth.middlewares.js');
const upload = require('../services/multer-storage-cloudinary.js');
const validationUserMiddlewares = require('../middlewares/validation.user.middlewares.js');

const route = express.Router();

route.post('/register',validationUserMiddlewares.registerUserValidationResult,Controllers.registeruser);

route.post('/login',validationUserMiddlewares.loginUserValidationResult, Controllers.loginuser);

route.get('/logout',Controllers.logoutuser);

route.put('/update-profile',validationUserMiddlewares.updateProfileValidationResult, AuthProtectRoute,upload.single('profilepic'), Controllers.updateProfile);

route.get("/check", AuthProtectRoute, (req, res) => res.status(200).json(req.user));

route.post("/forgot-password",validationUserMiddlewares.forgotPasswordValidationResult, Controllers.userPasswordForgot);

route.post("/reset-password/:resetLink", validationUserMiddlewares.resetPasswordValidationResult,Controllers.userPasswordChange);

route.post("/verify-account/:verificationToken",AuthProtectRoute, Controllers.userVerification);

module.exports = route;
