import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { encryptMessage, decryptMessage, generateSecretKey } from "../../../../server/utils/encryption";
import { db } from "../../../../server/configs/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Chatbot = ({ user }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const storedKey = localStorage.getItem(`encryption_key_${user.uid}`);
      if (storedKey) {
        setSecretKey(storedKey);
      } else {
        const newKey = generateSecretKey();
        localStorage.setItem(`encryption_key_${user.uid}`, newKey);
        setSecretKey(newKey);
      }
    }
  }, [user]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const encryptedMessage = encryptMessage(message, secretKey);

    const newMessage = {
      role: "user",
      content: message,
      timestamp: Date.now(),
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatHistory, userMessage: encryptedMessage }),
    });

    const data = await response.json();
    const decryptedContent = decryptMessage(data.message, secretKey);

    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: decryptedContent },
    ]);
    setLoading(false);
  };

  return (
      <div>
        <div>
          {chatHistory.map((msg, idx) => (
              <p key={idx}>{msg.content}</p>
          ))}
        </div>
        <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
  );
};

export default Chatbot;
