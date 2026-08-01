import { create } from "zustand";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

export const useAuthStore = create((set, get)=>({
    authUser: null,
    isCheckAuth: true,
    isSigningUp: false,
    isLogginin: false,
    isUpdatingProfileImage: false,
    socket: null,
    onlineUsers: [],

    CheckAuth: async () => {
      try{ 
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data});
        get().connectSocket();
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
        get().connectSocket();
      } catch(error) {
        toast.error(error.response?.data?.message);
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
        get().connectSocket()
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
        get().disconnectSocket();
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
    connectSocket: () => {
      const authUser = get().authUser;
      const existingSocket = get().socket;

      if(!authUser || existingSocket?.connected) return;

      const getSocketToken = () => {
        if (typeof document === "undefined") return null;
        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));

        return tokenCookie ? tokenCookie.split("=")[1] : null;
      };

      const socket = io("http://localhost:3000", {
        withCredentials: true,
        auth: {
          token: getSocketToken(),
        },
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
      });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });

      socket.connect();
      set({ socket });
    },
    disconnectSocket: () => {
      if (get().socket?.disconnect) get().socket.disconnect();
    },
}))