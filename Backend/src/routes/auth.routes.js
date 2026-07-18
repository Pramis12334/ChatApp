const express = require('express');
const Controllers = require('../controllers/server');
const { AuthProtectRoute } = require('../middlewares/auth.middlewares.js');
const upload = require('../services/multer-storage-cloudinary.js');

const route = express.Router();

route.post('/register',Controllers.registeruser);

route.post('/login', Controllers.loginuser);

route.get('/logout',Controllers.logoutuser);

route.put('/update-profile', AuthProtectRoute,upload.single('profilepic'), Controllers.updateProfile);

module.exports = route;
