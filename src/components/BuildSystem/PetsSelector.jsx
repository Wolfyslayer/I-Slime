import React from "react";
import { petsData } from "../../data/data";

export default function PetsSelector({ selectedPets, setSelectedPets }) {
  function togglePet(petName) {
    setSelectedPets(prev => {
      if (prev.includes(petName)) {
        return prev.filter(p => p !== petName);
      }
      if (prev.length < 5) {
        return [...prev, petName];
      }
      return prev;
    });
  }

  return (
    <div className="section">
      <h2>Välj Pets (max 5)</h2>
      <div className="choices">
        {petsData.map(pet => (
          <div
            key={pet.name}
            className={`choice multiselect ${selectedPets.includes(pet.name) ? "selected" : ""}`}
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
