const handleVideoCallEvent = (socket, io, userSocketMap) => {
    socket.on("initiate_call", ({callerId,receiverId,callType,callerInfo}) => {
        const receiverSocketId = userSocketMap[receiverId];

        if(receiverSocketId) {
            const callId = `${callerId}-${receiverId}-${Date.now()}`;

            io.to(receiverSocketId).emit("incoming_call",{
                callerId,
                callerName: callerInfo.username,
                callerProfile: callerInfo.profilepic,
                callType,
                callId
            })
        } else {
            console.log(`server: Receiver ${receiverId} is offline`);
            socket.emit("call_failed",{
                reason: "user is offline",
            });
            
        }
    })

    socket.on("accept_call", ({callerId,callId,receiverInfo}) => {
        const callerSocketId = userSocketMap[callerId];

if(callerSocketId ) {
     io.to(callerSocketId).emit("call_accepted", {
        receiverName: receiverInfo.username,
        receiverProfile: receiverInfo.profilepic,
        callId,
     });
    } else {
        console.log(`server: Caller ${callerId} not found`);
        socket.emit("call_failed", { reason: "user is offline"});
    }    
    });

    socket.on("reject_call", ({ callerId,callId}) => {
        const callerSocketId = userSocketMap[callerId];

        if(callerSocketId) {
            io.to(callerSocketId).emit("call_rejected", {callId});
        }
    })

    socket.on("end_call", ({callId, participantId}) => {
        const participantSocketId = userSocketMap[participantId];
        if(participantSocketId) {
            io.to(participantSocketId).emit("call_ended", {callId});
        }
    })

    socket.on("webrtc_offer", ({ offer, receiverId, callId}) => {
        const receiverSocketId = userSocketMap[receiverId];

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("webrtc_offer", {
                offer,
                senderId: socket.userId,
                callId
            });
            
            console.log( `server offer forwaded to ${receiverId}`);
        } else {
            console.log(`server: Receiver ${receiverId} not found the offer`);
        }
    });

    socket.on("webrtc_answer", ({answer, receiverId, callId}) => {
        const receiverSocketId = userSocketMap[receiverId];

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("webrtc_answer",{
                answer,
                senderId:socket.userId,
                callId
            });
            console.log(`server answer forwaded to ${ receiverId }`);
        } else {
            console.log(`server: Receiver ${ receiverId } didnt answer`);
        }
    });

    socket.on("webrtc_ice_candidate",({ candidate, receiverId, callId}) => {
        const receiverSocketId = userSocketMap[receiverId];

        if(receiverSocketId) {
            io.to(receiverSocketId).emit("webrtc_ice_candidate", {
                candidate,
                senderId: socket.userId,
                callId
            });
        } else {
            console.log(`server: Receiver ${receiverId} not found the ICE candidate`);
        }
    } )
}

export { handleVideoCallEvent }