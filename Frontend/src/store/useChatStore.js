import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";



export const useChatStore = create((set,get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled});
    },

    setActiveTab: (tab) => set({ activeTab: tab}),
    setSelectedUser: (selectedUser) => set({ selectedUser}),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try{ 
            const res = await axiosInstance.get("/message/contacts");
            set({ allContacts: res.data});
        } catch(error) {
            toast.error("Error while getting your Contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMyChatPartners: async () => {
        set({ isMessagesLoading: true });
        try{ 
            const res = await axiosInstance.get("/message/chats");
            set({ chats: res.data});
            
        } catch(error) {
            toast.error("Couldnt get your chat");
        } finally {
            set({ isMessagesLoading: false});
            
        }
    },
    getConversationByUserId: async (userId) => {
        set({ isMessagesLoading: true})
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data});
        } catch(error) {
            toast.error(error.response?.data?.messages || "Couldnt get your Conversation")
        } finally {
            set({ isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser?._id,
            receiverId: selectedUser?._id,
            text: messageData.get ? messageData.get("text") : messageData.text,
            image: messageData.get ? messageData.get("image") : messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        set((state) => ({ messages: [...state.messages, optimisticMessage] }));

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            set((state) => ({
                messages: state.messages.filter((msg) => msg._id !== tempId).concat(res.data),
            }));
        } catch (error) {
            set((state) => ({
                messages: state.messages.filter((msg) => msg._id !== tempId),
            }));
            toast.error(error.response?.data?.message || "Message couldnt send");
        }
    },
    subscribeToMessage: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set((state) => ({ messages: [...state.messages, newMessage] }));

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Audio play failed", e));
            }
        };

        socket.off("newMessage", handleNewMessage);
        socket.on("newMessage", handleNewMessage);
    },
    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
    },

}))