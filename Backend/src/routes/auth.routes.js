const express = require('express');
const Controllers = require('../controllers/server');

const route = express.Router();

route.post('/register',Controllers.registeruser);

route.get('/login', Controllers.loginuser);

route.get('/logout',Controllers.logoutuser);

module.exports = route;
