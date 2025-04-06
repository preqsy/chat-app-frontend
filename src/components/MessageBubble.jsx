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
      className={`group flex items-end gap-2 ${
        isSender ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar (only show for received messages) */}
      {!isSender && (
        <div className="flex-shrink-0">
          <img
            src={message.avatar || Vector}
            alt={message.sender}
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}

      {/* Message Content */}
      <div className="relative max-w-[70%]">
        {/* Message Actions */}

        {/* Message Bubble */}
        <div
          className={`relative p-3 ${
            isSender
              ? "bg-indigo-600 text-white rounded-l-xl rounded-tr-xl"
              : "bg-gray-100 text-gray-900 rounded-r-xl rounded-tl-xl"
          }`}
        >
          {/* Sender Name */}
          {!isSender && (
            <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
          )}

          {/* Message Text */}
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>

          {/* Timestamp */}
          <p
            className={`text-xs ${
              isSender ? "text-indigo-100" : "text-gray-500"
            } text-right mt-1`}
          >
            {formatTime(message.time)}
          </p>

          {/* Message Status (for sent messages) */}
          {isSender && (
            <span className="absolute -bottom-4 right-0 text-xs text-gray-500">
              {message.status === "sent" && "✓"}
              {message.status === "delivered" && "✓✓"}
              {message.status === "read" && (
                <span className="text-blue-500">✓✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
