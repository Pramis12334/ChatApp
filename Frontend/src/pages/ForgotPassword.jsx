import React, { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import { Loader, MailIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { LoaderIcon } from 'react-hot-toast';


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [ isSubmitted, setisSubmitted ] = useState(null);
  const {isLoading, forgotPassword} = useAuthStore();

  const handleSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
            <div className="relative w-1/4 md:h-[600px] h-[650px]">
              <BorderAnimatedContainer>
                <div className="w-full flex flex-col items-center justify-center ">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-slate-200 mb-10">Forgot Password</h2>
                        { !isSubmitted ? (
                          <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Email */}
                      <div>
                        <p className='text-gray-300 mb-6 text-center text-bold'>
                          Enter your email address and we will send you a link to reset your password.
                        </p>
                          <div className='relative'>
                          <MailIcon className='auth-input-icon' />
                        <input 
                          type="email"
                          className="input"
                          value={email}
                          onChange={(e) =>  setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                        />
                          </div>
                      </div>
                      {/* Submit button */}
                      <button className="auth-btn h-10"  type="submit" >
                        {isLoading ? <Loader className='animate-spin size-6 mx-auto' />: "Send Reset Link"}
                      </button>
                    </form>
                        ) : (
                          <div></div>
                        )}
                      
                    </div>
                </div>
              </BorderAnimatedContainer>
            </div>
        </div>
  )
}

export default ForgotPassword
