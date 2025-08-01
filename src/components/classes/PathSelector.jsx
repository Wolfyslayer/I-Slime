import React from 'react';

const paths = {
  archer: [
    { id: 'sniper', name: 'Sniper' },
    { id: 'hunter', name: 'Hunter' },
  ],
  swordsman: [
    { id: 'knight', name: 'Knight' },
    { id: 'berserker', name: 'Berserker' },
  ],
  mage: [
    { id: 'fire', name: 'Fire Mage' },
    { id: 'ice', name: 'Ice Mage' },
  ],
};

export default function PathSelector({ selectedClass, selectedPath, onSelectPath }) {
  if (!selectedClass) return null;

  return (
    <div className="section">
      <h2>Choose Path</h2>
      <div className="choices">
        {paths[selectedClass].map((path) => (
          <div
            key={path.id}
            className={`choice ${selectedPath === path.id ? 'selected' : ''}`}
            onClick={() => onSelectPath(path.id)}
          >
            <span>{path.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

