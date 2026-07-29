import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound'
import { useChatStore } from '../store/useChatStore';
import { set } from 'mongoose';

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound()
    const [ text, setText ] =useState("");
    const [imagePreview, setImagePreview ] = useState(null);
    const fileInputRef = useRef(null);

    const { sendMessage, isSoundEnabled} = useChatStore();

    const handleSendMessages = (e) => {
        e.preventDefault() 
        if(!text.trim() && !imagePreview) return;
        if(isSoundEnabled) return playRandomKeyStrokeSound;
        sendMessage({
            text: text.trim(),
            image: imagePreview
        });
        setText("");
        setImagePreview("");
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")) {
         toast.error("Please select an image file");
         return;
        }
        const formData = new FormData();
        formData.append("image", file);
        setImagePreview(URL.createObjectURL(file));
    }
    const removeImage = () => {
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
  return (
    <div>
      
    </div>
  )
}

export default MessageInput
