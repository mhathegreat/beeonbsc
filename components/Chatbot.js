"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function BeeChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null); // ✅ Ensures input field focus

  // 🟡 Load messages from localStorage on first render
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);
  }, []);

  // 🔄 Scroll to the latest message when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Auto-focus input field after sending a message
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Show thinking animation
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Bzzz... Thinking 🤔🐝", thinking: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Remove "thinking" animation and add bot's actual response
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove last "thinking" message
        { role: "bot", text: data.reply },
      ]);

      // 📝 Save messages in localStorage to retain memory
      localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove thinking animation
        { role: "bot", text: "Bzzz... Something went wrong! 🐝" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-gold p-4 relative bg-[url('/images/background.png')] bg-cover overflow-hidden">
      
      {/* 🏆 Banner with Border & Buttons Overlay */}
      <div className="relative w-full max-w-4xl mt-4 mb-2 border-4 border-yellow-600 rounded-lg shadow-lg bg-yellow-400 bg-opacity-90 p-4">
        <img src="/banner.png" alt="Bee on BSC Banner" className="w-full rounded-lg" />
        
        {/* 🔗 Navigation Buttons Overlay */}
        <nav className="absolute inset-0 flex justify-center items-center gap-6">
          <a href="https://x.com/beeonbnb" className="px-6 py-3 bg-yellow-500 bg-opacity-80 text-black rounded-lg font-bold shadow-md hover:bg-opacity-100 transition-all text-center w-28 border-2 border-yellow-700">
            X
          </a>
          <a href="https://t.me/BEE_CTO_BnB" className="px-6 py-3 bg-yellow-500 bg-opacity-80 text-black rounded-lg font-bold shadow-md hover:bg-opacity-100 transition-all text-center w-28 border-2 border-yellow-700">
            TG
          </a>
          <a href="https://github.com/mhathegreat/beeonbsc" className="px-6 py-3 bg-yellow-500 bg-opacity-80 text-black rounded-lg font-bold shadow-md hover:bg-opacity-100 transition-all text-center w-28 border-2 border-yellow-700">
            GitHub
          </a>
          <a href="#" className="px-6 py-3 bg-yellow-500 bg-opacity-80 text-black rounded-lg font-bold shadow-md hover:bg-opacity-100 transition-all text-center w-28 border-2 border-yellow-700">
            Home
          </a>
        </nav>
      </div>
      
      {/* 📩 Chatbox with Honeycomb Theme */}
      <div className="h-[80vh] w-full max-w-4xl bg-yellow-200 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-xl p-6 flex flex-col border-4 border-yellow-600 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-yellow-600 w-full">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-4 rounded-2xl max-w-full text-black ${msg.role === "user" ? "bg-yellow-500 bg-opacity-90 shadow-md border-2 border-yellow-700" : "bg-yellow-400 bg-opacity-90 shadow-md border-2 border-yellow-800"}`}>
                {msg.text}
                {msg.thinking && (
                  <span className="ml-2 animate-pulse text-yellow-800">⏳</span>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* ✍ Input Box */}
        <div className="flex gap-4 p-4 bg-yellow-300 bg-opacity-80 rounded-b-lg border-t-2 border-yellow-600 w-full">
          <input
            ref={inputRef} // ✅ Ensures input is focused
            className="flex-1 p-3 bg-transparent border border-yellow-600 rounded-lg text-black outline-none placeholder-yellow-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bzzz... Ask me anything!"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            className="p-4 bg-yellow-500 rounded-full shadow-lg hover:scale-110 border-2 border-yellow-700"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin h-6 w-6 border-t-2 border-black rounded-full"></div>
            ) : (
              <Send size={28} color="black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
