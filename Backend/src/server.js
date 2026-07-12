const express = require('express');
const route = require('./routes/server');
const { connectDB } = require('./lib/db');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', route.Authroute);

module.exports = app;