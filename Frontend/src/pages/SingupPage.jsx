import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";

function SingupPage() {
  const [formData, setFormData] = useState({username: "", email: "" ,password: ""})
  const [Signup, isSigningup] = useAuthStore();

  const handleSubmit = (e) => {
   e.preventDefault();
   Signup(formData)
  }
  return <div className='bg-red-300 w-full'>
    
    </div>
}

export default SingupPage
