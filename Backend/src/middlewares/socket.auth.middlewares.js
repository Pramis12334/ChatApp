const jwt = require('jsonwebtoken');
const Model = require('../models/server.js');

const getSocketToken = (socket) => {
  const authToken = socket.handshake.auth?.token;
  if (authToken) return authToken;

  const tokenHeader = socket.handshake.headers.authorization;
  if (tokenHeader?.startsWith('Bearer ')) {
    return tokenHeader.split(' ')[1];
  }

  const rawCookie = socket.handshake.headers.cookie || '';
  const tokenCookie = rawCookie
    .split(';')
    .map((row) => row.trim())
    .find((row) => row.startsWith('token='));

  return tokenCookie?.split('=')[1] || null;
};

const socketAuthMiddlewares = async (socket, next) => {
   try {
     const token = getSocketToken(socket);

     if(!token) {
        console.log("Socket connection rejected: No token provided");
        return next(new Error("Unauthorized - No token provided"));
     }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);
     if(!decoded) {
        console.log("Socket connection rejected: Invalid Token");
        return next(new Error("Unauthorized - Invalid Token"));
     }

     const user = await Model.User.findById(decoded.userId);

     if(!user) {
        console.log("Socket connection rejected: Invalid user");
        return next(new Error("Unauthorized- No User found"));
     }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user ${ user.username } (${user._id})`);
    
    next();
   } catch(error) {
    console.log("Error in protectRoute middleware:", error);
    return next(new Error("Unauthorized - Internal Server Error"));
   }
};

module.exports={
    socketAuthMiddlewares
}