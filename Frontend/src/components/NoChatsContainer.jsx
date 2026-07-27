import { useChatStore } from "../store/useChatStore"
import {MessageCircleIcon} from "lucide-react"

function NoChatsContainer() {
    const { setActiveTab} = useChatStore()
  return (
    <div className="flex flex-col py-10 space-y-4 items-center justify-center text-center">
      <div className="bg-cyan-500/10 rounded-full w-16 h-16 flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400"/>
      </div>
      <div>
        <h4 className="font-medium mb-1 text-slate-200">No conversation yet.</h4>
        <p className="text-sm px-6 text-slate-400">
            Start a new chat by selecting a contact from the contact tab
        </p>
      </div>
      <button 
      onClick={() => setActiveTab("contacts")}
      className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
        >
        Find Contacts
      </button>
    </div>
  )
}

export default NoChatsContainer
