import { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import { useChat } from '../hooks/useChat';
import Toast from './Toast';
import Vector from "../assets/Vector.svg"

export default function Chat({ username, currentUserId, receiverId }) {
  const [notification, setNotification] = useState(null);
  const { messages, sendMessage, loading, error } = useChat(currentUserId);

  useEffect(() => {
    if (error) {
      setNotification({
        type: 'error',
        message: error
      });
    }
  }, [error]);

  const handleSendMessage = async (messageData) => {
    try {
      await sendMessage(receiverId, messageData.text);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send message'
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        user={{
          name: 'Other User',
          status: 'online',
          avatar: {Vector}
        }}
        onVideoCall={() => console.log('Video call')}
        onVoiceCall={() => console.log('Voice call')}
        onMoreOptions={() => console.log('More options')}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={{
              id: message.id,
              text: message.content,
              time: message.createdAt,
              isSender: message.sender_id === currentUserId
            }}
          />
        ))}
      </div>

      <ChatInput 
        onSend={handleSendMessage}
        disabled={loading}
      />

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
