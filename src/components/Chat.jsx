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
    <div className="flex flex-col h-full bg-gray-900">
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

      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4">
        {useMessagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <div>Loading messages...</div>
          </div>
        ) : (
          <>
            {filteredMessages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                No messages yet. Start the conversation!
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

      <ChatInput onSend={handleSendMessage} disabled={loading} />

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
