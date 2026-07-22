import { create } from "zustand";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";

export const userAuthStore = create((set)=>({
    authUser: null,
    isCheckAuth: true,

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
    }
}))