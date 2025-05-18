'use client';

import { useState, useRef } from 'react';
import { X, BotMessageSquare, RotateCcw } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReset = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'RESET_CHAT' }, '*');
  };

  return (
    <>
      <div className="fixed bottom-6 right-8 z-20">
        <div className="group relative">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close chat window' : 'Open chat window'}
            aria-expanded={open}
            aria-controls="chat-widget"
            className="bg-white border-2 border-black hover:bg-secondary text-black rounded-full p-3 shadow-lg transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-accent"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <BotMessageSquare className="h-5 w-5 md:h-12 md:w-12" aria-hidden="true" />
            )}
          </button>

          {!open && (
            <span
              role="tooltip"
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
            >
              OptiChat
            </span>
          )}
        </div>
      </div>

      {open && (
        <div
          id="chat-widget"
          role="dialog"
          aria-modal="true"
          aria-label="Live chat support"
          className="fixed bottom-20 right-6 z-20 w-96 h-80 bg-white rounded-xl shadow-xl border border-gray-300 overflow-hidden focus:outline-none"
        >
          <button
            onClick={handleReset}
            aria-label="Reset chat"
            title="Reset chat"
            className="absolute top-2 right-2 z-30 bg-accent text-black p-1 rounded-full hover:bg-secondary hover:text-white transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <iframe
            ref={iframeRef}
            src="/botui.html"
            title="Chatbot"
            className="w-full h-full border-none"
          />
        </div>
      )}
    </>
  );
}
