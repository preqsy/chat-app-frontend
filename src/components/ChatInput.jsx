import { useState, useRef } from "react";

export default function ChatInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "inherit";
    const computed = window.getComputedStyle(textarea);
    const height =
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    textarea.style.height = `${Math.min(height, 120)}px`; // Max height of 120px
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    onSend({
      text: message,
      // attachments: attachments,
      timestamp: new Date().toISOString(),
    });

    setMessage("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-black p-4">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 flex items-end gap-2 min-h-[48px] bg-gray-700 rounded-2xl px-4 py-2">
          <div className="flex gap-2">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors self-end cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight(e.target);
              onTyping?.(true);
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border-none focus:ring-0 focus:outline-none resize-none min-h-[24px] max-h-[120px] py-1 px-2"
            rows={1}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-full transition-colors flex-shrink-0 bg-indigo-600 cursor-pointer ${
            message.trim() || attachments.length > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
