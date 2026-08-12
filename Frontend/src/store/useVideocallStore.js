import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const useVideocallStore = create(
    subscribeWithSelector((set,get) => (
       {
        currentCall: null,
        incomingCall: null,
        isCallActive: null,
        callType: null,

        localStream: null,
        remoteStream: null,
        isVideoEnabled: true,
        isAudioEnabled: true,
        
        // webRTC

        peerConnection: null,
        iceCandidatesQueue: [],

        isCallModelOpen: false,
        callStatus: "idle", //idle, calling, ringing, connecting, connected , ended

        setCurrentCall: (call) => {
            set({ currentCall: call});
        },
        setIncomingCall: (call) => {
            set({ incomingCall: call});
        },
        setIsCallActive: (active) => {
            set({ isCallActive: active});
        },
        setCallType: (type) => {
            set({ callType: type});
        },
        setlocalStream: (stream) => {
            set({ localStream: stream});

        },
        setRemoteStream: (stream) => {
            set({ remoteStream: stream});
        },
        setPeerConnection: (pc) => {
            set({ peerConnection: pc});
        },
        setIsCallModelOpen: (open) => {
            set({ isCallModelOpen: open});
        },
        setCallStatus: (status) => {
            set({ callStatus: status});
        },
        addIceCandidateQueue: (candidate) => {
            const {iceCandidatesQueue} = get();
            set({ iceCandidatesQueue: {...iceCandidatesQueue, candidate}});
        },
        processQuededIceCandidates: async() => {
            const {peerConnection, iceCandidatesQueue} = get();

            if(peerConnection && peerConnection.remoteDescription && iceCandidatesQueue.length > 0) {
                for(const candidate of iceCandidatesQueue) {
                    try {
                        await peerConnection.addIceCandidateQueue(new RTCIceCandidate(candidate));
                    } catch (error) {
                        console.error("Ice candidate error", error);
                    }
                }
                set({ iceCandidatesQueue: []});
            }
        },
        toggleVideo: () => {
            const { localStream, isVideoEnabled} = get();
            if(localStream) {
                const videoTrack = localStream.getVideoTracks()[0];
                if(videoTrack) {
                    videoTrack.enabled = !isVideoEnabled;
                    set({ isVideoEnabled: !isVideoEnabled});
                }
            }
        },
        toggleAudio: () => {
            const {localStream,isAudioEnabled} = get();
            if(localStream){
                const audioTrack = localStream.getAudioTracks()[0];
                if(audioTrack) {
                    audioTrack.enabled = !isAudioEnabled;
                    set({ isAudioEnabled: !isAudioEnabled});
                }
            }

        },
        endCall: ()  => {
            const { localStream, peerConnection} = get();
            if(localStream) {
                localStream.getTracks().forEach((tracks) => tracks.stop());
            }
            if(peerConnection) {
                peerConnection.close();
            }

            set({
                currentCall: null,
                incomingCall: null,
                isCallActive: null,
                callType: null,
                localStream: null,
                remoteStream: null,
                isVideoEnabled: true,
                isAudioEnabled: true,
                peerConnection: null,
                iceCandidatesQueue: [],
                isCallModelOpen: false,
                callStatus: "idle",
            });
        },
        clearIncomingCall: () => {
            set({ incomingCall: null});
        },
       }
    ))
)

export default useVideocallStore;