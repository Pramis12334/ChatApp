import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore"
import UserLoadingSkeleton from "./UsersLoadingSkeleton"
import NoChatsContainer from './NoChatsContainer';
import { useAuthStore } from '../store/useAuthStore';

function ChatsList() {
  const { chats, isUsersLoading, setSelectedUser, getMyChatPartners  } = useChatStore()
  const { onlineUsers } = useAuthStore()

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if(isUsersLoading) return <UserLoadingSkeleton />
  if(chats.length === 0) return <NoChatsContainer />

  return (
    <>
    { chats.map((chat) => (
      <div
      key={chat._id}
      className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
      onClick={() => setSelectedUser(chat)}
      >
        <div className='flex gap-3 items-center'>
          <div className={`avatar ${ onlineUsers.includes(chat._id) ? "online" : "offline" }`}>
            <div className='size-12 rounded-full'>
              <img 
            src={chat.profilepic || "/avatar.png"}
             />
            </div>
          </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.username}</h4>
        </div>
      </div>
    ))}
    </>
  )
}

export default ChatsList
