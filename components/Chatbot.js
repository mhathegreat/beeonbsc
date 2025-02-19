"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function BeeChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "Bzzz... Something went wrong!" }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-gold p-4">
      {/* Banner */}
      <div className="w-full max-w-4xl mb-4">
        <img src="/banner.png" alt="Bee on BSC Banner" className="w-full rounded-lg shadow-lg" />
      </div>
      
      {/* Chatbox */}
      <div className="h-[70vh] w-full max-w-2xl bg-yellow-900 bg-opacity-90 rounded-lg shadow-xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-lg max-w-xs text-white ${msg.role === "user" ? "bg-yellow-600" : "bg-gold"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Box */}
        <div className="flex gap-2 p-2 bg-black bg-opacity-50 rounded-b-lg">
          <input
            ref={inputRef}
            className="flex-1 p-2 bg-transparent border border-gold rounded-lg text-white outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bzzz... Ask me anything!"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="p-3 bg-gold rounded-full shadow-lg hover:scale-105"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send size={24} color="black" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-4">
        <a href="#" className="text-gold hover:underline">X</a>
        <a href="#" className="text-gold hover:underline">TG</a>
        <a href="#" className="text-gold hover:underline">GitHub</a>
        <a href="#" className="text-gold hover:underline">Home</a>
      </div>
    </div>
  );
}
