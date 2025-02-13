import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import './index.css'
import App from './App'
import client from './apollo-client'
import React from 'react'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>
)
