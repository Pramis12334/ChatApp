import { MessageCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton"

import { useAuthStore } from '../store/useAuthStore';
import ChatHeaders from './ChatHeaders';
import NoMessageHistory from './NoMessageHistory';

const ChatContainer = () => {
  const {isMessagesLoading, getConversationByUserId, messages, selectedUser} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=> {
    getConversationByUserId(selectedUser._id);
  }, [selectedUser,getConversationByUserId]);

  if(isMessagesLoading) return <UsersLoadingSkeleton />
  return (
   <>
   <ChatHeaders />
   <div className='px-6 flex-1 overflow-y-auto py-8'>
    {messages.length > 0 ? (
     <div className='max-w-3xl mx-auto space-y-6'>
        {messages.map((msg) => (
          <div 
          key={msg._id}
          className={`chat ${msg.senderId === authUser._id} ? "chat-end" : "chat-start" `}
          >
            <div
            className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-slate-800 text-slate-200"  :  "bg-cyan-600 text-white" }`}
            >
              { msg.image && (
                <img src={msg.image} alt="Shared" className='rounded-lg h-48 object-cover' />
              )}
              {msg.text && (
                <p className='mt-2'>{msg.text}</p>
              )}
              <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>
                {new Date(msg.createdAt).toISOString().slice(11, 16)}
              </p>
            </div>
          </div>
        ))}
     </div>
    ) : (
      <NoMessageHistory name={selectedUser.username} />
    )} 
   </div>
   </>
  )
}

export default ChatContainer
