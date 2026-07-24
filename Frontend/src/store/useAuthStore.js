import { create } from "zustand";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckAuth: true,
    isSigningUp: false,
    isLogginin: false,

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

    signup: async (data) => {
      set({isSigningUp: true})
      try {
        const res = await axiosInstance.post("/auth/register", data);
        set({ authUser: res.data});
        toast.success("Account created Successfully");
      } catch(error) {
        toast.error(error.response.data.message);
      } finally {
        set({isSigningUp: false});
      }

    },
    
    login: async (data) => {
      set({isLogginin: true})
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data});
        toast.success("Logged in Successfully");
      } catch(error) {
        toast.error(error.response.data.message);
      } finally {
        set({isLogginin: false});
      }
    },
}))