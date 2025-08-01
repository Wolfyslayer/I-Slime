import React from 'react';
import { petsData } from '../../data/pets';

export default function PetSelector({ selectedPets, setSelectedPets }) {
  function togglePet(petName) {
    if (selectedPets.includes(petName)) {
      setSelectedPets(selectedPets.filter(p => p !== petName));
    } else if (selectedPets.length < 5) {
      setSelectedPets([...selectedPets, petName]);
    } else {
      alert('Du kan bara välja 5 pets.');
    }
  }

  return (
    <div className="section">
      <h2>Välj Pets (max 5)</h2>
      <div className="choices">
        {petsData.map(pet => (
          <div
            key={pet.name}
            className={`choice multiselect ${selectedPets.includes(pet.name) ? 'selected' : ''}`}
            onClick={() => togglePet(pet.name)}
          >
            <img src={pet.img} alt={pet.name} />
            <span>{pet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
