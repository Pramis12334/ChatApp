import React, { useCallback, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import useVideocallStore from '../store/useVideocallStore';


const VideoCall = ({socket}) => {
  const { authUser}  = useAuthStore();
  const {setIncomingCall,
        setCurrentCall,
        setCallType,
        setIsCallModelOpen,
        setIsCallActive,
        setlocalStream,
        setRemoteStream,
        setPeerConnection,
        addIceCandidateQueue,
        processQuededIceCandidate,
        toggleVideo,
        toggleAudio,
        clearIncomingCall,
        endCall, 
        setCallStatus,
        currentCall,
        incomingCall,
        isCallActive,
        callType,
        localStream,
        remoteStream,
        isVideoEnabled,
        isAudioEnabled,
        peerConnection,
        iceCandidatesQueue,
        isCallModelOpen,
        callStatus,  } = useVideocallStore();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if(!socket) {
      return;
    }

    const handleIncomingCall = ({callerId, callerName, callerAvatar, callType, callId}) => {
      setIncomingCall({
        callerId,
        callerName,
        callerAvatar,
        callId
      });

      setCallType(callType)
      setIsCallModelOpen(true)
      setCallStatus("Ringing")
    }

    const handleEndCall = ({reason}) => {
      setCallStatus("Failed")
      setTimeout(() => {
        endCall();
      }, 2000);
    }

    socket.on("incoming_call",handleIncomingCall);
    socket.on("end_call",handleEndCall);

    return () => {
       socket.off("incoming_call",handleIncomingCall);
       socket.off("end_call",handleEndCall);
    }
  }, [setIncomingCall,setCurrentCall,setCallType,setIsCallModelOpen,setCallStatus,endCall, authUser, socket]);

  const initiateCall = useCallback((receiverId,receiverName,receiverProfilePic, callType="video") =>{
    const callId = `${authUser?._id}-${receiverId}-${Date.now()}`;

    const callData = ({
      callId,
      participantId: receiverId,
      participantName: receiverName,
      participantProfilePic: receiverProfilePic
    });

    setCurrentCall(callData)
    setCallType(callType)
    setIsCallModelOpen(true)
    setCallStatus("calling")

    socket.emit("initiate_call", {
      callerId: authUser?._id,
      receiverId,
      callType,
      callerInfo: {
        username: authUser?._id,
        profilepic: authUser?.profilepic,
      }
    });
  },[setIsCallModelOpen,setCurrentCall,setCallStatus,setCallType,authUser,socket])

  useEffect(() => {
    useVideocallStore().getState().initiateCall = initiateCall
  }, [ initiateCall ])
  return (
    <div>
    </div>
  )
}

export default VideoCall
