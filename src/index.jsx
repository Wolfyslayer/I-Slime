// src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import './lib/i18n' // om du använder i18n för översättning
import './styles/theme.css'

const root = document.getElementById('root')

if (root) {
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  )
}
