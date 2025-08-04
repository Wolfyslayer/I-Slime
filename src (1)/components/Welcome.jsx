// src/components/Welcome.jsx
import React from 'react'
import '../styles/Auth.css'

export default function Welcome() {
  return (
    <div className="auth-container">
      <h2>Welcome!</h2>
      <p>Your account has been successfully confirmed.</p>
      <p>You can now <a href="/login">log in</a> to start using the app.</p>
    </div>
  )
}
