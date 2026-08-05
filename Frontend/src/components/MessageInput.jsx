import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound'
import { useChatStore } from '../store/useChatStore';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react'
import toast from 'react-hot-toast';

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound()
    const [ text, setText ] =useState("");
    const [imagePreview, setImagePreview ] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);


    const { sendMessage, isSoundEnabled} = useChatStore();

    const handleSendMessages = async (e) => {
        e.preventDefault();
        if(!text.trim() && !imageFile) return;
        if(isSoundEnabled) return playRandomKeyStrokeSound;

        const formData = new FormData();
        formData.append("text", text.trim());
        if (imageFile) {
            formData.append("image", imageFile);
        }

        await sendMessage(formData);
        setText("");
        setImagePreview(null);
        setImageFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")) {
         toast.error("Please select an image file");
         return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
  return (
    <div className='p-4 border-t border-slate-700/50 '>
       { imagePreview && (
        <div className='max-w-3xl mx-auto mb-3 flex items-center'>
            <div className="relative">
                <img 
                src={imagePreview}
                alt='Preview'
                className='w-20 h-20 object-cover rounded-lg border border-slate-700'
                />
                <button
                onClick={removeImage}
                className='absolute -top-2 -right-2 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-slate-200 hover:bg-slate-700'
                type='button'
                >
                   < XIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>
       )}
       <form 
       className='max-w-3xl mx-auto flex space-x-4'
        onSubmit={handleSendMessages}>
            <input 
            type="text"
            value={text}
            onChange={(e) => {
                setText(e.target.value)
                isSoundEnabled && playRandomKeyStrokeSound()
            }}
            className='flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 py-4'
            placeholder='Type your message..'
            />
            <input
            type="file"
            className='hidden'
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            />
            <button
            className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${ imagePreview ? "text-cyan-500" : ""}`}
            type='button'
            onClick={() => fileInputRef.current?.click()}
            >
                <ImageIcon className="w-5 h-5"/>
            </button>
            <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
       </form>
      
    </div>
  )
}

export default MessageInput
