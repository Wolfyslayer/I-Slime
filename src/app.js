import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import BuildList from './BuildList';
import BuildDetail from './BuildDetail';
import CreateBuild from './CreateBuild';

export default function App() {
  const [builds, setBuilds] = useState([]);

  // Lägg till en build
  function addBuild(build) {
    setBuilds([...builds, build]);
  }

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Build Planner</h1>
          <nav>
            <Link to="/">Bygglista</Link> | <Link to="/create">Skapa Build</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<BuildList builds={builds} />} />
            <Route path="/build/:id" element={<BuildDetail builds={builds} />} />
            <Route path="/create" element={<CreateBuild addBuild={addBuild} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
