import { useEffect, useState } from "react";
import { useChat, useRecentChats } from "../hooks/useChat";
import LoadingSpinner from "../components/LoadingSpinner";
import Ellipis_1 from "../assets/Ellipse_1.svg";
import { formatTimestamp } from "../utils";

export default function RecentChats({
  setSelectedFriend,
  className = "",
  sender,
}) {
  const { messages: newMessages, loading, error } = useChat(sender);
  const {
    messages: oldChats,
    loading: oldChatLoading,
    error: oldChatError,
  } = useRecentChats(sender.id);

  const [combinedChats, setCombinedChats] = useState([]);

  useEffect(() => {
    // Merge all messages
    const mergedChats = [...newMessages, ...oldChats];

    // Ensure uniqueness based on sender and receiver IDs
    const uniqueChats = Array.from(
      mergedChats
        .reduce((map, msg) => {
          // Create a unique key for each conversation (sorted sender-receiver pair)
          const participantsKey = [msg.sender.id, msg.receiver.id]
            .sort()
            .join("-");

          // Store only the latest message for each unique conversation
          if (
            !map.has(participantsKey) ||
            new Date(map.get(participantsKey).createdAt) <
              new Date(msg.createdAt)
          ) {
            map.set(participantsKey, msg);
          }

          return map;
        }, new Map())
        .values()
    );

    // Sort by latest timestamp
    uniqueChats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setCombinedChats(uniqueChats);
  }, [newMessages, oldChats]);

  if (oldChatLoading)
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (combinedChats.length === 0) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-12 h-12 mx-auto bg-gray-700 lg:bg-gray-300 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 lg:text-gray-600 font-medium">
            No recent chats
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Start a conversation with your friends
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {combinedChats.map((message) => (
        <div
          className={`flex items-center gap-3 lg:gap-4 cursor-pointer rounded-xl p-3 lg:p-4 transition-all duration-200 hover:bg-gray-700 lg:hover:bg-gray-100 active:scale-[0.98] ${className} group`}
          onClick={() =>
            message.sender.id !== sender.id
              ? setSelectedFriend(message.sender)
              : setSelectedFriend(message.receiver)
          }
          key={message.id}
        >
          <div className="relative flex-shrink-0">
            <img
              src={Ellipis_1}
              alt={message.receiver.firstName}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-gray-600 lg:ring-gray-200 group-hover:ring-indigo-500 transition-all duration-200"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 lg:border-white"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-white lg:text-gray-900 group-hover:text-indigo-600 lg:group-hover:text-indigo-600 truncate text-sm lg:text-base transition-colors duration-200">
                {message.sender.id !== sender.id
                  ? `${message.sender.firstName} ${message.sender.lastName}`
                  : `${message.receiver.firstName} ${message.receiver.lastName}`}
              </h3>

              <span className="text-xs text-gray-400 lg:text-gray-500 whitespace-nowrap ml-2">
                {formatTimestamp(message.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400 lg:text-gray-600 group-hover:text-gray-300 lg:group-hover:text-gray-800 truncate transition-colors duration-200">
                {message.content}
              </p>

              {/* Optional: Unread indicator */}
              <div className="flex-shrink-0 ml-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
