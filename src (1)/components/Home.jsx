import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Välkommen till Build Planner</h1>
      <Link to="/create">Skapa ny build</Link> | <Link to="/login">Logga in</Link>
    </div>
  )
}
