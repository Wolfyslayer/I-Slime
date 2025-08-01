import React from "react";
import { classImages } from "../../data/data";

export default function ClassSelector({ selectedClass, setSelectedClass }) {
  return (
    <div className="section">
      <h2>Välj Klass</h2>
      <div className="choices">
        {Object.entries(classImages).map(([cls, img]) => (
          <div
            key={cls}
            className={`choice ${selectedClass === cls ? "selected" : ""}`}
            onClick={() => setSelectedClass(cls)}
          >
            <img src={img} alt={cls} />
            <span>{cls}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
