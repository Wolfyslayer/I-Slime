// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { BuildProvider } from './components/BuildSystem/BuildContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import CreateBuild from './components/CreateBuild';
import MyBuilds from './components/MyBuilds';
import BuildDetail from './components/BuildDetail';
import EditBuild from './components/EditBuild';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <BuildProvider>
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/create-build"
                  element={
                    <ProtectedRoute>
                      <CreateBuild />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-builds"
                  element={
                    <ProtectedRoute>
                      <MyBuilds />
                    </ProtectedRoute>
                  }
                />
                <Route path="/build/:id" element={<BuildDetail />} />
                <Route
                  path="/edit-build/:id"
                  element={
                    <ProtectedRoute>
                      <EditBuild />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </BuildProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
