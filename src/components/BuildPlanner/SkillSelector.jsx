import React from 'react';
import { skillsData } from '../../data/skills';

export default function SkillSelector({ selectedSkills, setSelectedSkills }) {
  function toggleSkill(skillName) {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillName));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skillName]);
    } else {
      alert('Du kan bara välja 5 skills.');
    }
  }

  return (
    <div className="section">
      <h2>Välj Skills (max 5)</h2>
      <div className="choices">
        {skillsData.map(skill => (
          <div
            key={skill.name}
            className={`choice multiselect ${selectedSkills.includes(skill.name) ? 'selected' : ''}`}
            onClick={() => toggleSkill(skill.name)}
          >
            <img src={skill.img} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
