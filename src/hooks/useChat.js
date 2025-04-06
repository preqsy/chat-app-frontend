import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useCallback, useState } from 'react';
import { isWsConnected } from '../apollo-client';


const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      id
      content
      sender_id
      receiver_id
      createdAt
    }
  }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`

  subscription OnNewMessage($receiverId: Int!) {
    newMessage(receiver_id: $receiverId) {
      id
      content
      sender_id
      receiver_id
      createdAt
      sender {
        id
        firstName
        lastName
        username
        
      }
      receiver {
        id
        firstName
        lastName
        username
        
      }
    }
  }
`;

const RETRIEVE_MESSAGES = gql`
  query RetrieveMessages($sender_id: Int!, $receiver_id: Int!) {
    retrieveMessages(sender_id: $sender_id, receiver_id: $receiver_id) {
      id
      content
      sender_id
      receiver_id
      createdAt
    }
  }
`;

const RECENT_CHATS = gql`
  query RecentChats($sender_id: Int) {
    getRecentChats(sender_id: $sender_id) {
      id
      content
      sender_id
      receiver_id
      createdAt
      sender {
        id
        username
        firstName
        lastName
      }
      receiver {
        id
        username
        firstName
        lastName
      }
    }
  }
`;




export const useChat = (user) => {

  const userId = Number(user.id)
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Send Message Mutation
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.error('Send message error:', error);
      setError(error.message);
    }
  });

  // Message Subscription
  const { data: newMessageData, loading: subscriptionLoading } = useSubscription(
    NEW_MESSAGE_SUBSCRIPTION,
    {
      variables: { receiverId: userId },
      skip: !userId,
      onError: (error) => {
        console.error('Subscription error:', error);
        setError('Lost connection to chat service');
      },
    }
  );
  

  // Handle new messages
  useEffect(() => {
    if (newMessageData?.newMessage) {
      setMessages(prev => [...prev, newMessageData.newMessage]);
    }
  }, [newMessageData, setMessages]);
  


  // Send message handler with retry logic
  const handleSendMessage = useCallback(async (receiver, content) => {
    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            content: content.trim(),
            receiver_id: Number(receiver.id),
            sender_id: Number(userId)
          }
        }
      });
      
      if (data?.sendMessage) {
        setMessages(prev => [...prev, data.sendMessage]);  // <--- Message added manually
        return data.sendMessage;
      }


    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
      throw error;
    }
  }, [userId, sendMessageMutation]);

  // Reset messages when userId changes
  useEffect(() => {
    setMessages([]);
  }, [userId]);

  // Add connection status check
  useEffect(() => {
    if (!isWsConnected()) {
      setError('Chat connection lost. Reconnecting...');
    } else {
      setError(null);
    }
  }, [isWsConnected()]);

  return {
    messages,
    sendMessage: handleSendMessage,
    loading: sendingMessage || subscriptionLoading,
    error,
    clearError: () => setError(null)
  };
}; 

export const useMessages = (senderId, receiverId) => {
  const { data, loading, error } = useQuery(RETRIEVE_MESSAGES, {
    variables: { sender_id: senderId, receiver_id: receiverId },
    fetchPolicy: "network-only", // Ensures fresh data is fetched
  });

  return { messages: data?.retrieveMessages || [], loading, error };
};

export const useRecentChats = (senderId) => {
  const { data, loading, error } = useQuery(RECENT_CHATS, {
    variables: { sender_id: senderId },
    fetchPolicy: "network-only", // Ensures fresh data is fetched
  });

  return { messages: data?.getRecentChats || [], loading, error };
};
