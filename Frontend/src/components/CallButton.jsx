import { VideoIcon } from 'lucide-react'
import React from 'react'

function CallButton({handleVideoCall}) {

  const handleVideoCall = async() => {
    
  }
  return (
    <div className='p-3 flex items-center'>
      <button onClick={handleVideoCall} className='btn btn-success btn-sm text-white' >
        <VideoIcon />
      </button>
    </div>
  )
}

export default CallButton
