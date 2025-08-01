import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateBuild from './components/CreateBuild'
import Home from './components/Home'
import Login from './components/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateBuild />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
