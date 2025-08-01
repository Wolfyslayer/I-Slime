import React from 'react';

const pets = [
  { id: 'wolf', name: 'Wolf', img: '/images/pet_wolf.png' },
  { id: 'dragon', name: 'Dragon', img: '/images/pet_dragon.png' },
  { id: 'fox', name: 'Fox', img: '/images/pet_fox.png' },
];

export default function PetsSelector({ selectedPet, onSelectPet }) {
  return (
    <div className="section">
      <h2>Select Your Pet</h2>
      <div className="choices">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className={`choice ${selectedPet === pet.id ? 'selected' : ''}`}
            onClick={() => onSelectPet(pet.id)}
          >
            <img src={pet.img} alt={pet.name} />
            <span>{pet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

