import { create } from "zustand";

export const userAuthStore = create((set)=>({
    authUser: {name: "Pramis Raya"},
    isLoading: false,
    isLoggedIn: false,
    login: () => {
      console.log("You have logged in");
      set({isLoggedIn: true});
    },
}))