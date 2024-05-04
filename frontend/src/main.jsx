import { AuthContextProvider } from './context/AuthContext.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

