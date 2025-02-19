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
    <div className="h-screen w-full flex flex-col items-center justify-center text-gold p-4">
      {/* Banner */}
      <div className="w-full max-w-4xl mb-4">
        <img src="/banner.png" alt="Bee on BSC Banner" className="w-full rounded-lg shadow-lg" />
      </div>
      
      {/* Chatbox */}
      <div className="h-[90vh] w-[90vw] max-w-[1000px] bg-opacity-0 backdrop-blur-lg rounded-lg shadow-xl p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-4 rounded-lg max-w-3xl text-white ${msg.role === "user" ? "bg-yellow-600 bg-opacity-80" : "bg-gold bg-opacity-80"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Box */}
        <div className="flex gap-4 p-4 bg-opacity-0 rounded-b-lg">
          <input
            ref={inputRef}
            className="flex-1 p-3 bg-transparent border border-gold rounded-lg text-white outline-none placeholder-gold"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bzzz... Ask me anything!"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="p-4 bg-gold rounded-full shadow-lg hover:scale-110"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send size={28} color="black" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-6 mt-6">
        <a href="#" className="px-6 py-2 bg-gold text-black rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-all">X</a>
        <a href="#" className="px-6 py-2 bg-gold text-black rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-all">TG</a>
        <a href="#" className="px-6 py-2 bg-gold text-black rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-all">GitHub</a>
        <a href="#" className="px-6 py-2 bg-gold text-black rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-all">Home</a>
      </div>
    </div>
  );
}
