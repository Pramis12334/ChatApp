import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore"
import UserLoadingSkeleton from "./UsersLoadingSkeleton"
import NoChatsContainer from './NoChatsContainer';

function ChatsList() {
  const { chats, isUsersLoading, setSelectedUser, getMyChatPartners  } = useChatStore()

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
          <div className='avatar online'>
            <div className='size-12 rounded-full'>
              <img 
            src={chat.profilepic || "/avatar.png"}
             alt={chat.username} />
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.username}</h4>
          </div>
        </div>
      </div>
    ))}
    </>
  )
}

export default ChatsList
