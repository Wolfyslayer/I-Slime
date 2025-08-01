import React, { useState } from 'react';

const statsOptions = [
  'HP', 'ATK', 'DEF', 'Crit Rate', 'Combo', 'Counter', 'Stun', 'Dodge', 'Recover', 'Skill Crit Hit', 'Attack Speed'
];

export default function ItemsEditor({ items, onChangeItems }) {
  const [localItems, setLocalItems] = useState(items || []);

  function updateItem(index, field, value) {
    const newItems = [...localItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setLocalItems(newItems);
    onChangeItems(newItems);
  }

  function addItem() {
    const newItems = [...localItems, { name: '', stats: {} }];
    setLocalItems(newItems);
    onChangeItems(newItems);
  }

  function removeItem(index) {
    const newItems = localItems.filter((_, i) => i !== index);
    setLocalItems(newItems);
    onChangeItems(newItems);
  }

  function updateStat(index, stat, value) {
    const newItems = [...localItems];
    newItems[index].stats = { ...newItems[index].stats, [stat]: value };
    setLocalItems(newItems);
    onChangeItems(newItems);
  }

  return (
    <div className="section">
      <h2>Edit Items</h2>
      {localItems.map((item, i) => (
        <div className="item-container" key={i}>
          <div className="item-header">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => updateItem(i, 'name', e.target.value)}
            />
            <button onClick={() => removeItem(i)}>Remove</button>
          </div>
          <div className="special-stats">
            {statsOptions.map((stat) => (
              <div className="stat-select" key={stat}>
                <label>{stat}</label>
                <input
                  type="number"
                  min="0"
                  value={item.stats[stat] || ''}
                  onChange={(e) => updateStat(i, stat, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addItem}>Add New Item</button>
    </div>
  );
}

