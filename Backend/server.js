import dotenv from 'dotenv';
dotenv.config();
import { server } from './src/lib/socket.io.js';
import app from'./src/server.js';
import { connectDB }  from './src/db/db.js' ;

connectDB();

server.listen(3000, () => {
console.log("Server is running on port 3000");
});

