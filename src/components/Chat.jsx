import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useChat } from "../hooks/useChat";
import Toast from "./Toast";
import Vector from "../assets/Vector.svg";

export default function Chat({ sender, receiver }) {
  console.log("This is receiver", receiver);
  // console.log("This is currentUserId", sender);
  const [notification, setNotification] = useState(null);
  const { messages, sendMessage, loading, error } = useChat(receiver);

  useEffect(() => {
    if (error) {
      setNotification({
        type: "error",
        message: error,
      });
    }
  }, [error]);

  const handleSendMessage = async (messageData) => {
    try {
      console.log("Sending message:", messageData);
      console.log("Receiver ID:", receiver.id);
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={{
              id: message.id,
              text: message.content,
              time: message.createdAt,
              isSender: message.sender_id === sender,
            }}
          />
        ))}
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
