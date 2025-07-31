import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Auth from './components/Auth'
import BuildList from './components/BuildList'
import BuildDetail from './components/BuildDetail'
import CreateBuild from './components/CreateBuild'

export default function App() {
  return (
      <Router>
            <div className="app-container">
                    <header>
                              <h1>Build Planner</h1>
                                        <nav>
                                                    <Link to="/">Bygglista</Link> | <Link to="/create">Skapa Build</Link> | <Link to="/auth">Login</Link>
                                                              </nav>
                                                                      </header>

                                                                              <main>
                                                                                        <Routes>
                                                                                                    <Route path="/" element={<BuildList />} />
                                                                                                                <Route path="/build/:id" element={<BuildDetail />} />
                                                                                                                            <Route path="/create" element={<CreateBuild />} />
                                                                                                                                        <Route path="/auth" element={<Auth />} />
                                                                                                                                                  </Routes>
                                                                                                                                                          </main>
                                                                                                                                                                </div>
                                                                                                                                                                    </Router>
                                                                                                                                                                      )
                                                                                                                                                                      }
                                                                                                                                                                      