const express = require('express');
const route = require('./routes/server');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app } = require('./lib/socket.io.js');


app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL, credentials: true}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/auth', route.Authroute);
app.use('/api/message', route.Messageroute);

module.exports = app;