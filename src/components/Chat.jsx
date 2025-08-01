import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useChat } from "../hooks/useChat";
import { useMessages } from "../hooks/useChat";
import Toast from "./Toast";
import Vector from "../assets/Vector.svg";

export default function Chat({ sender, receiver }) {
  const [notification, setNotification] = useState(null);
  const [combinedMessages, setCombinedMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const {
    messages: newMessages,
    sendMessage,
    loading,
    error,
  } = useChat(sender);

  const {
    messages: oldMessages,
    loading: useMessagesLoading,
    error: useMessagesError,
  } = useMessages(sender.id, receiver.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (oldMessages.length > 0 || newMessages.length > 0) {
      const allMessages = [...oldMessages, ...newMessages];
      const uniqueMessages = allMessages.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      uniqueMessages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setCombinedMessages(uniqueMessages);
    }
  }, [oldMessages, newMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [combinedMessages]);

  const filteredMessages = combinedMessages.filter(
    (msg) =>
      (msg.sender_id === sender.id && msg.receiver_id === receiver.id) ||
      (msg.sender_id === receiver.id && msg.receiver_id === sender.id)
  );

  useEffect(() => {
    if (error || useMessagesError) {
      setNotification({
        type: "error",
        message: error || useMessagesError,
      });
    }
  }, [error, useMessagesError]);

  const handleSendMessage = async (messageData) => {
    try {
      await sendMessage(receiver, messageData.text);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to send message",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 lg:bg-white">
      <ChatHeader
        user={{
          name: receiver.username,
          status: "online",
          avatar: { Vector },
        }}
        onVideoCall={() => console.log("Video call")}
        onVoiceCall={() => console.log("Voice call")}
        onMoreOptions={() => console.log("More options")}
      />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 bg-gray-900 lg:bg-gray-50">
        {useMessagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="text-gray-400 text-sm">Loading messages...</p>
            </div>
          </div>
        ) : (
          <>
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-gray-700 lg:bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-500"
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
                    No messages yet
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Start the conversation with {receiver.username}!
                  </p>
                </div>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={{
                    id: message.id,
                    text: message.content,
                    time: message.createdAt,
                  }}
                  isSender={message.sender_id === sender.id}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="bg-gray-900 lg:bg-white border-t border-gray-700 lg:border-gray-200">
        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </div>

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
