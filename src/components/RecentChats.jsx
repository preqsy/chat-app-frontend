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
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );

  return (
    <div>
      {combinedChats.map((message) => (
        <div
          className={`flex items-center gap-3 cursor-pointer ${className} group`}
          onClick={() =>
            message.sender.id !== sender.id
              ? setSelectedFriend(message.sender)
              : setSelectedFriend(message.receiver)
          }
          key={message.id}
        >
          <div className="relative">
            <img
              src={Ellipis_1}
              alt={message.receiver.firstName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-white group-hover:text-black truncate">
                {message.sender.id !== sender.id
                  ? `${message.sender.firstName} ${message.sender.lastName}`
                  : `${message.receiver.firstName} ${message.receiver.lastName}`}
              </h3>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatTimestamp(message.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 truncate group-hover:text-black">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
