// src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import { AuthProvider } from './lib/AuthProvider'
import './lib/i18n';

import './styles/theme.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
)
