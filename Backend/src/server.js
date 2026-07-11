const express = require('express');
const route = require('./routes/server');

const app = express();

app.use(express.json());
app.use('/api/auth', route.Authroute);

module.exports = app;