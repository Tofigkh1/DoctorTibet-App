// import { useState, useEffect } from "react";
// import { useAuthContext } from "../providers/AuthProvider";
// import OpenAI from "openai";
// import { ref, set, get } from "firebase/database";
// import ReactMarkdown from "react-markdown";
// import { useLanguage } from "../providers/LanguageProvider";
// import CryptoJS from "crypto-js";

// const generateSecretKey = () => {
//   return CryptoJS.lib.WordArray.random(256 / 8).toString();
// };

// const encryptMessage = (message, secretKey) => {
//   try {
//     const iv = CryptoJS.lib.WordArray.random(16);
//     const encrypted = CryptoJS.AES.encrypt(
//       JSON.stringify({ message }),
//       secretKey,
//       {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       }
//     );
//     return iv.toString() + encrypted.toString();
//   } catch (error) {
//     console.error("Encryption error:", error);
//     return null;
//   }
// };

// const decryptMessage = (encryptedText, secretKey) => {
//   try {
//     const iv = CryptoJS.enc.Hex.parse(encryptedText.slice(0, 32));
//     const ciphertext = encryptedText.slice(32);

//     const decrypted = CryptoJS.AES.decrypt(ciphertext, secretKey, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     const decryptedObj = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
//     return decryptedObj.message;
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return null;
//   }
// };

// export const Chatbot = () => {
//   const { userData, realtimedb } = useAuthContext();
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { translations } = useLanguage();
//   const [secretKey, setSecretKey] = useState(null);

//   useEffect(() => {
//     if (userData) {
//       const storedKey = localStorage.getItem(encryption_key_${userData.uid});
//       if (storedKey) {
//         setSecretKey(storedKey);
//       } else {
//         const newKey = generateSecretKey();
//         localStorage.setItem(encryption_key_${userData.uid}, newKey);
//         setSecretKey(newKey);
//       }
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (userData && secretKey) {
//       const dbRef = ref(realtimedb, "chatHistory/" + userData.uid);
//       get(dbRef).then((snapshot) => {
//         if (snapshot.exists()) {
//           const encryptedHistory = Object.values(snapshot.val());
//           const decryptedHistory = encryptedHistory
//             .map((msg) => ({
//               ...msg,
//               content: decryptMessage(msg.content, secretKey) || msg.content,
//             }))
//             .filter((msg) => msg.content !== null);

//           setChatHistory(decryptedHistory);
//         }
//       });
//     }
//   }, [userData, realtimedb, secretKey]);

//   const sendMessage = async () => {
//     if (!message.trim() || !secretKey) return;
//     setLoading(true);

//     const timestamp = Date.now();

//     const newMessage = {
//       role: "user",
//       content: message,
//       timestamp: timestamp,
//     };

//     const encryptedNewMessage = {
//       ...newMessage,
//       content: encryptMessage(newMessage.content, secretKey),
//     };

//     setMessage("");

//     setChatHistory((prevHistory) => [...prevHistory, newMessage]);

//     if (userData) {
//       try {
//         const response = await client.chat.completions.create({
//           model: "gpt-4o",
//           messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             ...chatHistory,
//             newMessage,
//           ],
//           temperature: 1,
//           max_tokens: 4096,
//           top_p: 1,
//         });

//         const botMessage = {
//           role: "assistant",
//           content: response.choices[0].message.content,
//           timestamp: Date.now(),
//         };

//         const encryptedBotMessage = {
//           ...botMessage,
//           content: encryptMessage(botMessage.content, secretKey),
//         };

//         const dbRef = ref(realtimedb, chatHistory/${userData.uid});
//         const currentHistory = await get(dbRef);
//         const existingHistory = currentHistory.exists()
//           ? Object.values(currentHistory.val())
//           : [];

//         const updatedHistory = [
//           ...existingHistory,
//           encryptedNewMessage,
//           encryptedBotMessage,
//         ];

//         await set(dbRef, updatedHistory);

//         setChatHistory((prevHistory) => [...prevHistory, botMessage]);
//       } catch (error) {
//         console.error("Error fetching OpenAI response:", error);
//         setChatHistory((prevHistory) => prevHistory.slice(0, -1));
//       }
//     }

//     setLoading(false);
//   };

//   const client = new OpenAI({
//     apiKey: import.meta.env.VITE_APP_GITHUB_API_KEY,
//     dangerouslyAllowBrowser: true,
//     baseURL: "https://models.inference.ai.azure.com",
//   });

//   const clearChatHistory = () => {
//     if (userData) {
//       const chatRef = ref(realtimedb, chatHistory/${userData.uid});
//       set(chatRef, []);
//     }
//     setChatHistory([]);
//   };

//   return !userData ? (
//     <section className="flex flex-col items-center justify-center bg-white dark:bg-black">
//       <h1 className="text-3xl font-bold dark:text-white text-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
//         {translations.pleaseLoginChat}
//       </h1>
//     </section>
//   ) : (
//     <section className="min-h-[90vh] flex flex-col dark:bg-black bg-white">
//       {!chatHistory.length && (
//         <div className="flex items-center justify-center flex-grow">
//           <h1 className="sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#FF7F11] to-purple-500 inline-block text-transparent bg-clip-text">
//             Welcome, {userData.Name}
//           </h1>
//         </div>
//       )}
//       <div className="flex-grow overflow-y-auto p-4">
//         {chatHistory.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             } mb-4`}
//           >
//             <div
//               className={`max-w-[80%] sm:max-w-[90%] md:max-w-[70%] p-3 rounded-lg shadow-md text-wrap break-words ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-700 text-gray-200"
//               }`}
//             >
//               <ReactMarkdown>{msg.content}</ReactMarkdown>
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="flex justify-start mb-4">
//             <div className="max-w-xs p-3 bg-gray-600 rounded-lg animate-pulse text-gray-200">
//               {translations.typing}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-gray-800">
//         <div className="flex items-center rounded-lg border dark:border-gray-800 dark:bg-gray-800 border-gray-200 bg-gray-200">
//           <label className="sm:h-20 lg:h-40 px-2 flex items-center rounded-l-lg dark:text-gray-400 dark:hover:bg-gray-700 text-black hover:bg-[#FF7F11] hover:text-white focus:outline-none cursor-pointer">
//             <input
//               type="file"
//               className="hidden"
//               accept=".pdf,.doc,.docx,.txt"
//               onChange={() => {}}
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//               />
//             </svg>
//           </label>
//           <textarea
//             className="flex-grow p-2 bg-transparent dark:text-white text-black focus:outline-none sm:h-20 lg:h-40 resize-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder={translations.placeholder}
//             rows={1}
//           />
//           <div className="flex items-center">
//             <button
//               className="sm:h-20 lg:h-40 px-2 flex items-center disabled:cursor-not-allowed disabled:hover:text-black disabled:hover:bg-gray-200 disabled:dark:hover:bg-gray-800 disabled:dark:text-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 text-black hover:bg-[#FF7F11] hover:text-white focus:outline-none "
//               onClick={sendMessage}
//               disabled={!message.trim()}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={clearChatHistory}
//               className="sm:h-20 lg:h-40 px-2 flex items-center rounded-r-lg dark:text-gray-400 dark:hover:bg-gray-700 text-black hover:bg-[#FF7F11] hover:text-white focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };