"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Bot, X, Send } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ================= CHATBOT ================= */}
      {chatOpen && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[calc(100%-40px)] max-w-95 overflow-hidden rounded-2xl border bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">LKS AI</h3>
                <p className="text-xs text-blue-100">
                  Your Learning Assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="rounded-full p-2 transition hover:bg-white/20"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-80 bg-gray-50 p-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-gray-700 shadow-sm">
              👋 Hi! I&apos;m LKS AI.

              <p className="mt-1">
                How can I help you with courses, admissions or learning?
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border bg-gray-50 p-1">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask LKS AI..."
                className="h-10 flex-1 bg-transparent px-3 text-sm outline-none"
              />

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed bottom-5 right-5 z-[9998] flex flex-col items-center gap-3">

        {/* Back To Top */}
        {showTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex h-8 w-8 items-center justify-center rounded-full border bg-white text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
          >
            <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        )}

        {/* LKS AI */}
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open LKS AI"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700"
        >
          <Bot className="h-6 w-6" />

          {/* Online dot */}
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        </button>

      </div>
    </>
  );
}