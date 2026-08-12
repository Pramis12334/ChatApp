import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import { VideoIcon, XIcon } from 'lucide-react';
import CallButton from './CallButton';
import useVideocallStore from '../store/useVideocallStore';

function ChatHeaders() {
    const { selectedUser, setSelectedUser} = useChatStore();
    const { onlineUsers }=useAuthStore()

    const handleVideoCall = () => {
      if(selectedUser && onlineUsers.includes(selectedUser._id)) {
        const { initiateCall } = useVideocallStore.getState();

        initiateCall(
          selectedUser?._id,
          selectedUser?.username,
          selectedUser?.profilepic,
          "video"
        );
      } else {
        alert("User is offline. Please try again later.");
      }
    }
  return (
    <div className='flex justify-between items-center max-h-[84px] px-6 flex-1 bg-slate-800/50 border-b border-slate-700/50'>
      <div className='flex items-center space-x-3'>
        <div className={`avatar ${onlineUsers.includes(selectedUser._id) ? "online" : "offline"}`}>
            <div className='size-12 rounded-full'>
                 <img src={ selectedUser.profilepic || "/avatar.png"} alt={selectedUser.username}  className='w-12 rounded-full '/>
            </div>
        </div>
        
        {/* username & online */}
            <div>
                <h3 className='text-slate-200 font-medium'>
                  {selectedUser.username}
                </h3>
                <p className='text-slate-400 text-xm'>{ onlineUsers.includes(selectedUser._id) ? "online" : "offline"}</p>
        </div>
       
      </div>
      {/* video call button */}
      < CallButton handleVideoCall={handleVideoCall} />
       {/*  close button*/}
        <button onClick={() => setSelectedUser(null)}>
           < XIcon className='w-5 h-5 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors' />
        </button>
    </div>
  )
}

export default ChatHeaders
