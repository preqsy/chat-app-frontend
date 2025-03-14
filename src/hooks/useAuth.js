import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateAuthUser($input: AuthUserCreate!) {
    createAuthUser(input: $input) {
      authUser {
        id
        email
        firstName
        lastName
        username
        createdAt
      }
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginAuthUser($input: AuthUserLogin!) {
    loginAuthUser(input: $input) {
      token
    }
  }
`;

export const useCreateAuthUser = () => {
  const [createAuthUser, { loading, error, reset }] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.error('Registration error:', error.message);
      if (error.message.includes('duplicate')) {
        return new Error('Email or username already exists');
      }
      return error;
    },
    onCompleted: (data) => {
      const token = data?.createAuthUser?.token;
      if (!token) {
        console.error('No token received');
        return;
      }
      try {
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Failed to store token:', error);
      }
    }
  });

  return {
    createAuthUser,
    loading,
    error,
    resetError: reset
  };
};

export const useLoginUser = () => {
  const [loginUser, { loading, error, reset }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error('Login error:', error.message);
      // Handle specific error types
      if (error.message.includes('credentials')) {
        return new Error('Invalid email or password');
      }
      return error;
    },
    onCompleted: (data) => {
      if (data?.loginAuthUser?.token) {
        localStorage.setItem('token', data.loginAuthUser.token);
      }
    }
  });

  return {
    loginUser,
    loading,
    error,
    resetError: reset
  };
}; 