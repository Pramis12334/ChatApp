import express from 'express';
import Controllers from '../controllers/server.js';
const route = express.Router();
import {AuthProtectRoute} from '../middlewares/auth.middlewares.js';
import upload from '../services/multer-storage-cloudinary.js';
import validationMessage from '../middlewares/validation.message.middlewares.js';

route.use(AuthProtectRoute);

route.get('/contacts', Controllers.getAllContacts);
route.get('/chats', Controllers.getAllMessage);
route.get('/:id', Controllers.getMessageByUserId);
route.post('/send/:id',validationMessage.sendMessageValidationResult, upload.single('image'),Controllers.sendMessage);


export default route;