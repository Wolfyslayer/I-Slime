import React from "react";
import { pathImages, classData } from "../../data/data";

export default function PathSelector({ selectedClass, selectedPath, setSelectedPath }) {
  if (!selectedClass) return null;

  const paths = Object.keys(classData[selectedClass]);

  return (
    <div className="section">
      <h2>Välj Utvecklingsväg</h2>
      <div className="choices">
        {paths.map(path => (
          <div
            key={path}
            className={`choice ${selectedPath === path ? "selected" : ""}`}
            onClick={() => setSelectedPath(path)}
          >
            <img src={pathImages[path]} alt={path} />
            <span>{path}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
