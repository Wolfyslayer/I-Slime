import React from "react";
import { classData } from "../../data/data";

export default function EvolutionDisplay({ selectedClass, selectedPath }) {
  if (!selectedClass || !selectedPath) return null;

  const evolutions = classData[selectedClass][selectedPath];

  return (
    <div className="section">
      <h2>Evolutioner för {selectedPath}</h2>
      <ul>
        {evolutions.map(evo => (
          <li key={evo}>{evo}</li>
        ))}
      </ul>
    </div>
  );
}
