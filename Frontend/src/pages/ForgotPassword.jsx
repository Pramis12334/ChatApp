import React, { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import { ArrowLeftIcon, Loader, MailIcon, MailsIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router'


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [ isSubmitted, setisSubmitted ] = useState(null);
  const {isLoading, forgotPassword} = useAuthStore();
 
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    await forgotPassword(email);
  }
  return (
    <div className="w-full flex items-center justify-center p-4 ">
            <div className="relative w-1/4 md:h-[600px] h-[650px] bg-gray-800 flex flex-col justify-center rounded-md items-center ">
                <div className="w-full flex  items-center justify-center ">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-slate-200 mb-10">Forgot Password</h2>
                        { !isSubmitted ? (
                          <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Email */}
                      <div>
                        <p className='text-white-500 mb-6 text-center font-bold '>
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
                      <button className="auth-btn h-10"  type="submit">
                        {isLoading ? <Loader className='animate-spin size-6 mx-auto' />: "Send Reset Link"}
                      </button>
                    </form>
                        ) : (
                          <div className='text-center'>
                            <div className='w-16 h-16 rounded-full flex items-center rounded-full bg-cyan-500 justify-center mx-auto mb-4'>
                              <MailsIcon className='h-8 w-8 text-white' />
                            </div>
                              <p className='text-white-500 m-10 text-xl font-bold'>
                                If an account exists for {email}, you will receive a password reset link shortly.
                              </p>
                          </div>
                        )}
                      
                    </div>
                </div>
                <div className='px-8 py-4 flex justify-between text-cyan-500 rounded-md'>
                      <Link to={"/login"} className=' text-xl font-bold items-center flex'>
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to login
                      </Link>
                    </div>
            </div>
        </div>
  )
}

export default ForgotPassword
