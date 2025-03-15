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

  const handleReaction = (emoji) => {
    console.log("Reacting with:", emoji);
    // Here you would typically send the reaction to your backend
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
        <div
          className={`absolute ${
            isSender ? "right-full" : "left-full"
          } bottom-0 mb-1 mx-2 opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <div className="flex items-center gap-1 bg-white rounded-full shadow-lg p-1">
            <button
              onClick={() => handleReaction("👍")}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              👍
            </button>
            <button
              onClick={() => handleReaction("❤️")}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              ❤️
            </button>
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
            >
              •••
            </button>
          </div>
        </div>

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

          {/* Message Media (if any) */}
          {message.media && (
            <div className="mt-2">
              {message.media.type === "image" ? (
                <img
                  src={message.media.url}
                  alt="Attached media"
                  className="rounded-lg max-w-full"
                />
              ) : message.media.type === "video" ? (
                <video
                  src={message.media.url}
                  controls
                  className="rounded-lg max-w-full"
                />
              ) : null}
            </div>
          )}

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

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`flex gap-1 mt-1 ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {message.reactions.map((reaction, index) => (
              <span
                key={index}
                className="bg-white rounded-full shadow-sm px-2 py-1 text-xs"
              >
                {reaction.emoji} {reaction.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
