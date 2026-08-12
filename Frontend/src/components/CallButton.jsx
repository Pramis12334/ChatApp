import { VideoIcon } from 'lucide-react'
import React from 'react'

function CallButton({handleVideoCall}) {
  return (
    <div className='p-3 flex items-center'>
      <button onClick={handleVideoCall} className='btn btn-success btn-sm text-white' >
        <VideoIcon className='h-5 w-5'/>
      </button>
    </div>
  )
}

export default CallButton
