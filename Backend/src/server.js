import express from 'express';
import route from './routes/server.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app } from './lib/socket.io.js';
import {arcjetProtection} from './middlewares/arcjet.middlewares.js';


app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL, credentials: true}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(arcjetProtection);
app.use('/api/auth', route.Authroute);
app.use('/api/message', route.Messageroute);

export default app;