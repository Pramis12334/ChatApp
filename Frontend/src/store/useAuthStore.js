import { create } from "zustand";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckAuth: true,
    isSigningUp: false,
    isLogginin: false,
    isUpdatingProfileImage: false,

    CheckAuth: async () => {
      try{ 
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data});
      } catch(error) {
        console.error("Error in Checking AuthUser: ", error);
        set({ authUser: null })
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
        console.error("Error while logging in");
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

    logout: async () => {
      try {
        await axiosInstance.get("/auth/logout")
        set({ authUser: null });
        toast.success("Logout successfully");
      } catch(error) {
        toast.error("Couldn`t logout");
      }
    },
    
    updateProfile: async (data) => {
      set({isUpdatingProfileImage: true});
     try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      set({authUser: res.data});
      toast.success("Profile updated successfully");
     } catch(error) {
      toast.error("Couldnt upload pfp");
     } finally {
      set({ isUpdatingProfileImage: false})
     }
    },
}))