// src/components/AccessDenied.jsx
import React from 'react'
import '../styles/Auth.css'

export default function AccessDenied({ message = 'Du har inte behörighet att se denna sida.' }) {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#fff3f3',
      color: '#b30000',
      border: '1px solid #ffcccc',
      borderRadius: '8px',
      maxWidth: '500px',
      margin: '4rem auto'
    }}>
      <h2>🚫 Åtkomst nekad</h2>
      <p>{message}</p>
    </div>
  )
}
