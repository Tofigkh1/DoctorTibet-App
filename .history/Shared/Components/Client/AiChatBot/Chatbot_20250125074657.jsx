import { useState } from "react";
import OpenAI from "openai";
import { motion, AnimatePresence } from "framer-motion";
import { useResize } from "../../../Hooks/useResize";

export const Chatbot = ({ isVisible, toggleChat }) => {
  const [message, setMessage] = useState("");
    let { isMobile } = useResize();
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Salam! Mən Doctor Tibet'in asistanı və sizin tibbi köməkçinizəm. Necə kömək edə bilərəm?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const client = new OpenAI({                                                                                                            
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    baseURL: "https://models.inference.ai.azure.com",
  });

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessage("");

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Siz tibbi məsələlərdə kömək edən köməkçisiniz. Zəhmət olmasa, Azərbaycan dilində cavab verin." },
          ...chatHistory,
          newMessage,
        ],
        temperature: 0.7,
        max_tokens: 4096,
      });

      const botMessage = {
        role: "assistant",
        content: response.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prevHistory) => [...prevHistory, newMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }

    setLoading(false);
  };

  return (

    <div>

      <div>

      {!isMobile &&
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 w-96 max-w-[95vw] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[9999]"
        >
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Doctor Tibet Asistanı</h2>
            <button 
              onClick={toggleChat} 
              className="hover:bg-blue-700 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-300">
  {chatHistory.map((msg, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-2xl ${
          msg.role === "user" 
            ? "bg-blue-500 text-white" 
            : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        {msg.role === "assistant" && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="inline-block mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
        {msg.content}
      </div>
      <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
    </motion.div>
  ))}

  {loading && (
    <div className="text-center text-gray-500 animate-pulse">
      Yazır...
    </div>
  )}
</div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-slate-300 flex space-x-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mesajınızı yazın..."
              className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={sendMessage} 
              disabled={loading}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
   }



{isMobile &&
   <AnimatePresence>
   {isVisible && (
     <motion.div
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.9 }}
       transition={{ type: "spring", stiffness: 300, damping: 30 }}
       className="fixed inset-0 w-full h-full bg-white flex flex-col overflow-hidden z-[9999]"
     >
       {/* Chat Header */}
       <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
         <h2 className="text-lg font-semibold">Doctor Tibet Asistanı</h2>
         <button
           onClick={toggleChat}
           className="hover:bg-blue-700 p-2 rounded-full transition-colors"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <line x1="18" y1="6" x2="6" y2="18"></line>
             <line x1="6" y1="6" x2="18" y2="18"></line>
           </svg>
         </button>
       </div>
 
       {/* Chat Messages */}
       <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-300">
         {chatHistory.map((msg, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.3 }}
             className={`flex flex-col ${
               msg.role === "user" ? "items-end" : "items-start"
             }`}
           >
             <div
               className={`max-w-[80%] p-3 rounded-2xl ${
                 msg.role === "user"
                   ? "bg-blue-500 text-white"
                   : "bg-white text-gray-800 border border-gray-200"
               }`}
             >
               {msg.content}
             </div>
             <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
           </motion.div>
         ))}
 
         {loading && (
           <div className="text-center text-gray-500 animate-pulse">
             Yazır...
           </div>
         )}
       </div>
 
       {/* Message Input */}
       <div className="p-4 border-t border-gray-200 bg-slate-300 flex space-x-2">
         <input
           type="text"
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
           placeholder="Mesajınızı yazın..."
           className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
         />
         <button
           onClick={sendMessage}
           disabled={loading}
           className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <line x1="22" y1="2" x2="11" y2="13"></line>
             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
           </svg>
         </button>
       </div>
     </motion.div>
   )}
 </AnimatePresence>
 
   }

    </div>
    </div>
  );
};
