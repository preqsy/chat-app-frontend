import { gql, useQuery } from '@apollo/client';
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