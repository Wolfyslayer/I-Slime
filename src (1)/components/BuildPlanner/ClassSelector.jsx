import React from 'react';
import data from '../../data/classData';
import { classImages } from '../../data/images';

export default function ClassSelector({ onSelect, selected, setSelectedPath }) {
  return (
    <div className="section">
      <h2>Välj Klass</h2>
      <div className="choices">
        {Object.keys(data).map(cls => (
          <div
            key={cls}
            className={`choice ${selected === cls ? 'selected' : ''}`}
            onClick={() => {
              onSelect(cls);
              setSelectedPath(null);
            }}
          >
            <img src={classImages[cls]} alt={cls} />
            <span>{cls}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
