import React from "react";
import { skillsData } from "../../data/data";

export default function SkillsSelector({ selectedSkills, setSelectedSkills }) {
  function toggleSkill(skillName) {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(s => s !== skillName);
      }
      if (prev.length < 5) {
        return [...prev, skillName];
      }
      return prev;
    });
  }

  return (
    <div className="section">
      <h2>Välj Skills (max 5)</h2>
      <div className="choices">
        {skillsData.map(skill => (
          <div
            key={skill.name}
            className={`choice multiselect ${selectedSkills.includes(skill.name) ? "selected" : ""}`}
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
