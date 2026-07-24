import { create } from "zustand";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckAuth: true,
    isSigningup: false,

    CheckAuth: async () => {
      try{ 
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data})
      }catch(error) {
        console.log("Error in Checking AuthUser: ",error);
        set({ authUser: null})
      } finally {
        set({isCheckAuth: false})
      }
    },

    Signup: async () => {
      set({isSigningup: true})
      try {
        const res = await axiosInstance.post("/auth/register",data);
        set({ authUser: res.data});
        toast.sucess("Account created Successfully")
      } catch(error) {
        toast.error(error.response.data.message)
      } finally {
        set({isSigningup: false});
      }

    }
}))