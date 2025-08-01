import React from 'react';
import { items, specialStats } from '../../data/items';

export default function ItemConfigurator() {
  return (
    <div className="section">
      <h2>Item Stats</h2>
      {items.map(item => (
        <div className="item-container" key={item}>
          <div className="item-header">{item}</div>
          {["HP", "ATK", "DEF"].map(stat => (
            <label key={stat}>
              {stat}: <input type="number" defaultValue={0} min={0} />
            </label>
          ))}
          {item === "Weapon" && (
            <div className="atk-speed">
              <label>
                Attack Speed: <input type="number" defaultValue={0} min={0} />
              </label>
            </div>
          )}
          <div className="special-stats">
            {specialStats.map(stat => (
              <div key={stat} className="stat-select">
                <label>{stat}</label>
                <select>
                  {["-", "+1", "+2", "+3"].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
