const express = require('express');
const route = require('./routes/server');
const { connectDB } = require('./db/db');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/auth', route.Authroute);
app.use('/api/message', route.Messageroute);

module.exports = app;