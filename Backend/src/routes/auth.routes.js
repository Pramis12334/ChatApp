const express = require('express');
const Controllers = require('../controllers/server');

const route = express.Router();

route.get('/login',Controllers.registeruser);

module.exports = route;
