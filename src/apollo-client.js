import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "http://localhost:8080/query",
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("token")
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` :""
    }
  }
})

const client = new ApolloClient({
  // uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client; 