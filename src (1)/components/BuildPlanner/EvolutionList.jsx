import React from 'react';
import data from '../../data/classData';

export default function EvolutionList({ selectedClass, selectedPath }) {
  if (!selectedClass || !selectedPath) return null;
  const evolutions = data[selectedClass][selectedPath];

  return (
    <div className="section">
      <h2>Evolutioner</h2>
      <ul>
        {evolutions.map(evo => (
          <li key={evo}>{evo}</li>
        ))}
      </ul>
    </div>
  );
}
