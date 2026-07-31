require('dotenv').config();
const { server } = require('./src/lib/socket.io');
const app = require('./src/server.js');
const { connectDB }  = require('./src/db/db.js');

connectDB();

server.listen(3000, () => {
console.log("Server is running on port 3000");
});

