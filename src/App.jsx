import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BuildList from './components/BuildList';
import BuildDetail from './components/BuildDetail';
import CreateBuild from './components/CreateBuild';
import MyBuilds from './components/MyBuilds';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles/theme.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BuildList />} />
            <Route path="/create-build" element={<ProtectedRoute><CreateBuild /></ProtectedRoute>} />
            <Route path="/my-builds" element={<ProtectedRoute><MyBuilds /></ProtectedRoute>} />
            <Route path="/build/:id" element={<BuildDetail />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
