import express from 'express';
import Controllers from '../controllers/server.js';
import { AuthProtectRoute } from '../middlewares/auth.middlewares.js';
import upload from '../services/multer-storage-cloudinary.js';
import validationUserMiddlewares from '../middlewares/validation.user.middlewares.js';

const route = express.Router();

route.post('/register', validationUserMiddlewares.registerUserValidationResult, Controllers.registeruser);

route.post('/login', validationUserMiddlewares.loginUserValidationResult, Controllers.loginuser);

route.get('/logout', Controllers.logoutuser);

route.put('/update-profile', validationUserMiddlewares.updateProfileValidationResult, AuthProtectRoute, upload.single('profilepic'), Controllers.updateProfile);

route.get('/check', AuthProtectRoute, (req, res) => res.status(200).json(req.user));

route.post('/forgot-password', validationUserMiddlewares.forgotPasswordValidationResult, Controllers.userPasswordForgot);

route.post('/reset-password/:resetLink', validationUserMiddlewares.resetPasswordValidationResult, Controllers.userPasswordChange);

route.post('/verify-account/:verificationToken', AuthProtectRoute, Controllers.userVerification);

export default route;
