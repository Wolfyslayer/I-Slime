import React from 'react';

const skills = [
  { id: 'fireball', name: 'Fireball' },
  { id: 'shield', name: 'Shield' },
  { id: 'heal', name: 'Heal' },
];

export default function SkillsSelector({ selectedSkills, onToggleSkill }) {
  return (
    <div className="section">
      <h2>Select Skills</h2>
      <div className="choices">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`choice ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
            onClick={() => onToggleSkill(skill.id)}
          >
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

