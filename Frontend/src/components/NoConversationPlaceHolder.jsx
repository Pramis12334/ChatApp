import { MessageCircleIcon } from 'lucide-react'
import React from 'react'

const NoConversationPlaceHolder = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center p-6'>
      <div className='mb-6 flex items-center justify-center bg-cyan-500/20 size-20 rounded-full'>
        <MessageCircleIcon  className='size-10 text-xyan-400'/>
      </div>
      <h3 className='text-xl font-semibold text-slate-200 mb-2'> Select a conversation</h3>
      <p className='text-slate-400 max-w-md'> Choose a contact from the sidebar to start a conversation or continue a previous conversation</p>
    </div>
  )
}

export default NoConversationPlaceHolder
