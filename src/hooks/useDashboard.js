import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GET_CURRENT_USER = gql`
  query GetCurrentUser($token: String!) {
    getCurrentUser(token: $token) {
      id
      username
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;

const LIST_NEW_FRIENDS = gql`
  query ListUsers($filters: Filters) {
    listUsers(filters: $filters) {
      firstName
      lastName
      id
      email
    }
  }
`;
const LIST_FRIEND_REQUEST = gql`
  query ListUsers($filters: Filters) {
    listFriendRequest(filters: $filters) {
      firstName
      lastName
      id
      email
    }
  }
`;

const ADD_NEW_FRIEND = gql`
  mutation SendFriendRequest($receiver_id: Int!) {
    sendFriendRequest(receiver_id: $receiver_id) {
      firstName
      lastName
      id
      email
      
    }
  }
`
const ACCEPT_FRIEND_REQUEST = gql `
mutation AcceptFriendRequest($sender_id: Int!){
  acceptFriendRequest(sender_id:$sender_id){
    id
    firstName
  }
}
`

export const useGetCurrentUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { token },
    skip: !token,
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error('User fetch error:', error.message);
      try {
        localStorage.removeItem('token');
      } catch (e) {
        console.error('Failed to remove token:', e);
      }
      navigate('/login', { replace: true });
    }
  });

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        refetch();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [token, refetch]);

  return {
    currentUser: data?.getCurrentUser,
    loading,
    error,
    refetch
  };
};



export const useListNewFriends = () => {
  const { data, loading, error, refetch } = useQuery(LIST_NEW_FRIENDS, {
    variables: { filters: { skip: 0, limit: 10 } }, // Pass filter variables correctly
    onError: (error) => {
      console.error("Getting users error:", error.message);
    },
  });

  return {
    listUsers: data?.listUsers || [],
    loading,
    error,
    refetch, // Allow refetching
  };
};
export const useListFriendRequest = () => {
  const { data, loading, error, refetch } = useQuery(LIST_FRIEND_REQUEST, {
    variables: { filters: { skip: 0, limit: 10 } }, // Pass filter variables correctly
    onError: (error) => {
      console.error("Getting users error:", error.message);
    },
  });

  return {
    listFriendRequests: data?.listFriendRequest || [],
    loading,
    error,
    refetch, // Allow refetching
  };
};


export const useAddNewFriend = () => {
  const [sendFriendRequest, {data, loading, error}] = useMutation(ADD_NEW_FRIEND)
  return {sendFriendRequest, data, loading, error}
}

export const useAcceptFriendRequest = () => {
  const [acceptFriendRequest, {data, loading, error}] = useMutation(ACCEPT_FRIEND_REQUEST)
  return {acceptFriendRequest, data, loading, error}
}