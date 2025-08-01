import React from 'react';
import data from '../../data/classData';
import { pathImages } from '../../data/images';

export default function PathSelector({ selectedClass, onSelect, selectedPath }) {
  const paths = Object.keys(data[selectedClass] || {});

  return (
    <div className="section">
      <h2>Välj Path</h2>
      <div className="choices">
        {paths.map(path => (
          <div
            key={path}
            className={`choice ${selectedPath === path ? 'selected' : ''}`}
            onClick={() => onSelect(path)}
          >
            <img src={pathImages[path]} alt={path} />
            <span>{path}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
