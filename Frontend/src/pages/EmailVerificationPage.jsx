import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

function EmailVerificationPage() {

  const {verificationToken} = useParams();
  const { verifyAccount } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = async(e) => {
    e.preventDefault();
    try{
    await verifyAccount(verificationToken);

     toast.success("Account Verified Successfully, redirecting to Home page....");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    } catch(error) {
        console.error(error);
        toast.error(error.message || "Error occur while verifying account");
    }
  }
  return (
    <div className='max-w-md w-full bg-gray-800 overflow-hidden rounded-2xl relative'>
      <div className='p-8 text-center w-full h-[400px]'>
          <h2 className='text-4xl text-white font-bold mb-10'>Verify Account</h2>
          <p className='text-xl text-white font-semibold'>Click the button below to verify your account.</p>
 <div className='m-5'> 
   <button
   onClick={handleChange}
    className='auth-btn font-bold text-xl mt-10 h-[60px]'>
     Verify Your Account
     </button>
   </div>
      
         
      </div>
     
    </div>
  )
}

export default EmailVerificationPage
