import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';


function ContactsList() {
  const { allContacts, isUsersLoading, setSelectedUser, getAllContacts  } = useChatStore()

  useEffect(() => {
    getAllContacts();
  },[getAllContacts]);

  if(isUsersLoading) return <UsersLoadingSkeleton />
  
  return (
    <>
    { allContacts.map((contact) => (
      <div
      key={contact._id}
      className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
      onClick={() => setSelectedUser(contact)}
      >
        <div className='flex gap-3 items-center'>
          <div className='avatar online'>
            <div className='size-12 rounded-full'>
              <img 
            src={contact.profilepic || "/avatar.png"}
             alt={contact.username} />
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{contact.username}</h4>
          </div>
        </div>
      </div>
    ))}
    </>
  )
}

export default ContactsList
