const express = require('express');
const Controllers = require('../controllers/server');
const route = express.Router();
const {AuthProtectRoute} = require('../middlewares/auth.middlewares');
const upload = require('../services/multer-storage-cloudinary.js');

route.use(AuthProtectRoute);

route.get('/contacts', Controllers.getAllContacts);
route.get('/chats', Controllers.getAllMessage);
route.get('/:id', Controllers.getMessageByUserId);
route.post('/send/:id',upload.single('image'), Controllers.sendMessage);


module.exports = route;