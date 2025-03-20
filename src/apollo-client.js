import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query',
  credentials: 'include'
});

const wsClient = createClient({
  url: 'ws://localhost:8080/query',
  connectionParams: () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  },
  retryAttempts: 5,
  shouldRetry: () => true,
  connectionAckWaitTimeout: 5000,
  keepAlive: 10000,
});

const wsLink = new GraphQLWsLink(wsClient);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;

// Add connection status monitoring
let wsConnectionStatus = false;

wsClient.on('connected', () => {
  console.log('WebSocket connected');
  wsConnectionStatus = true;
});

wsClient.on('closed', () => {
  console.log('WebSocket closed');
  wsConnectionStatus = false;
});

export const isWsConnected = () => wsConnectionStatus; 