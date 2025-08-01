import { useState, useRef } from "react";

export default function ChatInput({ onSend, onTyping, disabled }) {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textareaRef = useRef(null);

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "inherit";
    const computed = window.getComputedStyle(textarea);
    const height =
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    textarea.style.height = `${Math.min(height, 120)}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSend({
      text: message,
      timestamp: new Date().toISOString(),
    });

    setMessage("");
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
    <div className="border-t border-gray-700 lg:border-gray-200 bg-gray-900 lg:bg-white p-3 lg:p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 lg:gap-3">
        {/* Message Input Container */}
        <div className="flex-1 flex items-end gap-2 lg:gap-3 min-h-[44px] lg:min-h-[52px] bg-gray-800 lg:bg-gray-50 rounded-2xl lg:rounded-3xl px-3 lg:px-4 py-2 lg:py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            className="p-1 lg:p-2 hover:bg-gray-700 lg:hover:bg-gray-200 rounded-full text-gray-400 lg:text-gray-500 transition-colors self-end focus:ring-2 focus:ring-indigo-500"
            aria-label="Add emoji"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
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

          {/* Attachment Button */}
          <button
            type="button"
            className="p-1 lg:p-2 hover:bg-gray-700 lg:hover:bg-gray-200 rounded-full text-gray-400 lg:text-gray-500 transition-colors self-end focus:ring-2 focus:ring-indigo-500"
            aria-label="Add attachment"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

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
            disabled={disabled}
            className="flex-1 border-none bg-transparent text-white lg:text-gray-900 placeholder-gray-400 lg:placeholder-gray-500 focus:ring-0 focus:outline-none resize-none min-h-[24px] lg:min-h-[28px] max-h-[120px] py-1 text-sm lg:text-base leading-relaxed"
            rows={1}
            autoFocus={false}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`p-3 lg:p-3 rounded-full transition-all duration-200 flex-shrink-0 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 lg:focus:ring-offset-white relative ${
            message.trim() && !disabled
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              : "bg-gray-700 lg:bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Send message"
        >
          {disabled && message.trim() ? (
            <div className="w-5 h-5 lg:w-6 lg:h-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
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
          )}
        </button>
      </form>

      {/* Emoji Picker Placeholder */}
      {isEmojiPickerOpen && (
        <div className="absolute bottom-full left-4 right-4 lg:left-auto lg:right-auto lg:w-80 mb-2 bg-gray-800 lg:bg-white rounded-xl shadow-xl border border-gray-700 lg:border-gray-200 p-4">
          <div className="text-center text-gray-400 lg:text-gray-500">
            <p className="text-sm">Emoji picker coming soon!</p>
            <button
              onClick={() => setIsEmojiPickerOpen(false)}
              className="mt-2 text-xs text-indigo-500 hover:text-indigo-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
