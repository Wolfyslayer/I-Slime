import React, { useState } from 'react';
import ClassSelector from './ClassSelector';
import PathSelector from './PathSelector';
import EvolutionList from './EvolutionList';
import PetSelector from './PetSelector';
import SkillSelector from './SkillSelector';
import ItemConfigurator from './ItemConfigurator';

import './BuildPlanner.css';

export default function BuildPlanner() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <div className="section">
      <h1>Build Planner</h1>
      <ClassSelector onSelect={setSelectedClass} selected={selectedClass} setSelectedPath={setSelectedPath} />
      {selectedClass && (
        <PathSelector
          selectedClass={selectedClass}
          onSelect={setSelectedPath}
          selectedPath={selectedPath}
        />
      )}
      {selectedPath && (
        <>
          <EvolutionList selectedClass={selectedClass} selectedPath={selectedPath} />
          <PetSelector selectedPets={selectedPets} setSelectedPets={setSelectedPets} />
          <SkillSelector selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
          <ItemConfigurator />
        </>
      )}
    </div>
  );
}
