import { useState } from "react";
import Vector from "../assets/Vector.svg";

export default function MessageBubble({ message, isSender }) {
  const [showActions, setShowActions] = useState(false);

  const formatTime = (timeString) => {
    try {
      return new Date(timeString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timeString; // Fallback to original string if parsing fails
    }
  };

  return (
    <div
      className={`group flex items-end gap-2 lg:gap-3 ${
        isSender ? "flex-row-reverse" : "flex-row"
      } animate-fade-in`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar (only show for received messages) */}
      {!isSender && (
        <div className="flex-shrink-0">
          <img
            src={message.avatar || Vector}
            alt={message.sender || "User"}
            className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover ring-2 ring-gray-600 lg:ring-gray-300"
          />
        </div>
      )}

      {/* Message Content */}
      <div className="relative max-w-[85%] lg:max-w-[70%]">
        {/* Message Actions - show on hover */}
        {showActions && (
          <div
            className={`absolute -top-8 ${isSender ? "right-0" : "left-0"} 
            hidden lg:flex items-center gap-1 bg-gray-800 rounded-lg px-2 py-1 shadow-lg z-10`}
          >
            <button
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="Reply"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
            </button>
            <button
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="React"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title="More"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`relative px-3 py-2 lg:px-4 lg:py-3 ${
            isSender
              ? "bg-indigo-600 text-white rounded-l-2xl rounded-tr-2xl shadow-lg"
              : "bg-gray-700 lg:bg-gray-100 text-white lg:text-gray-900 rounded-r-2xl rounded-tl-2xl shadow-lg"
          } transition-all duration-200 hover:shadow-xl`}
        >
          {/* Sender Name (for received messages) */}
          {!isSender && message.sender && (
            <p className="text-xs text-gray-400 lg:text-gray-500 mb-1 font-medium">
              {message.sender}
            </p>
          )}

          {/* Message Text */}
          <p className="text-sm lg:text-base whitespace-pre-wrap break-words leading-relaxed">
            {message.text}
          </p>

          {/* Timestamp */}
          <p
            className={`text-xs ${
              isSender ? "text-indigo-200" : "text-gray-400 lg:text-gray-500"
            } text-right mt-2 lg:mt-1`}
          >
            {formatTime(message.time)}
          </p>

          {/* Message Status (for sent messages) */}
          {isSender && (
            <div className="absolute -bottom-5 right-0 flex items-center gap-1">
              <span className="text-xs text-gray-500">
                {message.status === "sent" && "✓"}
                {message.status === "delivered" && "✓✓"}
                {message.status === "read" && (
                  <span className="text-blue-400">✓✓</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
