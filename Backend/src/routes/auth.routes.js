const express = require('express');
const Controllers = require('../controllers/server');
const { AuthProtectRoute } = require('../middlewares/auth.middlewares.js');

const route = express.Router();

route.post('/register',Controllers.registeruser);

route.post('/login', Controllers.loginuser);

route.get('/logout',Controllers.logoutuser);

route.post('/update-profile', AuthProtectRoute, Controllers.updateProfile);

module.exports = route;
