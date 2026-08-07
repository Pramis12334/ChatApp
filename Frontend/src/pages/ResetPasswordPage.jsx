import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LockIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
    const [newpassword, setNewPassword] = useState("");
    const {error, resetPassword, isLoading} = useAuthStore();
    const [confirmnewpassword, setConfirmNewPassword] = useState("");
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if( newpassword !== confirmnewpassword) {
            alert("Password do not match");
            return;
        }
        try {
            await resetPassword(token,newpassword);

        toast.success("Password Reset Successfully, redirecting to login page....");
        setTimeout(() => {
            navigate("/login")
        }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error while resetting password");
        }
    }
  return (
    <div className='max-w-md w-full bg-gray-800 overflow-hidden rounded-md relative'>
      <div className='p-8 text-center'>
        <h2 className='text-3xl font-bold mb-6 text-white mt-4' >Reset Password</h2>
        { error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
           <div className='relative mb-2 mt-10'>
            <LockIcon className='auth-input-icon'/>
             <input 
            type="password"
            placeholder='New Password'
            className='input text-xl'
            onChange={(e) => setNewPassword(e.target.value)}
            />
           </div>
            <div className='relative mb-2 mt-5'>
            <LockIcon className='auth-input-icon'/>
             <input 
            type="password"
            placeholder='Confirm New Password'
            className='input text-xl'
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
           </div>
           <button className='auth-btn font-bold mt-10 h-[60px]'>
            {isLoading ? "Resetting......" : "Set New Password"}
           </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
