import React from 'react';
import './ClassSelector.css'; // skapa om du vill extra styling

const classes = [
  { id: 'archer', name: 'Archer', img: '/images/archer.png' },
  { id: 'swordsman', name: 'Swordsman', img: '/images/swordsman.png' },
  { id: 'mage', name: 'Mage', img: '/images/mage.png' },
];

export default function ClassSelector({ selectedClass, onSelectClass }) {
  return (
    <div className="section">
      <h2>Choose Your Class</h2>
      <div className="choices">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`choice ${selectedClass === cls.id ? 'selected' : ''}`}
            onClick={() => onSelectClass(cls.id)}
          >
            <img src={cls.img} alt={cls.name} />
            <span>{cls.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

