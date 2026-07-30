import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import { LoaderIcon, LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react';

const mouseClickSound = new Audio("sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfileImage } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [ selectedImg, setSelectedImg ] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if(!file) return

    const formData = new FormData();
    formData.append("profilepic", file);
    setSelectedImg(URL.createObjectURL(file));
    await updateProfile(formData);
  }
  return (
    <div className='p-6 border-b border-slate-700/50'>
       <div className='flex items-center justify-between '>
          <div className='flex items-center gap-3'>
              {/* Avatar */}
              <div className='avatar online'>
                <button 
                className='size-14 rounded-full overflow-hidden relative group'
                onClick={() => fileInputRef.current.click()}
                disabled= {isUpdatingProfileImage}
                >
                      { isUpdatingProfileImage ? (
                        <LoaderIcon  className='animate-spin text-center w-full h-5'/>
                       ) : ( 
                        <>
                        <img 
                        src={selectedImg || authUser.profilepic || "/avatar.png" }
                        alt="User image"
                        className='size-full object-cover' 
                      />
                      <div 
                        className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity '
                      >
                        <span className='text-white font-bold text-xs'>Change</span>
                      </div>
                      </>
                    )}
                </button>
                <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className='hidden'
                 />
              </div>
              {/* Username & online text */}
               <div>
                <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
                  {authUser.username}
                </h3>
                <p className='text-slate-400 text-xs'>Online</p>
               </div>
          </div>
          {/* Button */}
          <div className="flex gap-4 items-center">
             {/* Sound toggle btn */}
               <button 
               className='text-slate-400 hover:text-slate-200 transition-colors'
               onClick={() => {
                mouseClickSound.currentTime = 0;
                mouseClickSound.play().catch((error) => {console.log("Couldnt toggle Sound", error)});
                toggleSound();
              }}
               >
                {isSoundEnabled ? (
                  <Volume2Icon className='size-5'/>
                ) : (
                  <VolumeOffIcon className='size-5'/>
                )}
               </button>

            {/* Logout btn */}
              <button 
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}
              >
                <LogOutIcon className="size-5" />
              </button>
               
           </div>
           
       </div>
    </div>
  )
}

export default ProfileHeader
