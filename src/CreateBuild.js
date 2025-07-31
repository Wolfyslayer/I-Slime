import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBuild({ addBuild }) {
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('Archer');
  const [evolution, setEvolution] = useState('Path 1');
  const [stats, setStats] = useState({
    HP: '',
    ATK: '',
    DEF: '',
    CritRate: '',
    Combo: '',
    Counter: '',
    Stun: '',
    Dodge: '',
    Recover: '',
    SkillCritHit: '',
    AttackSpeed: '',
  });

  const navigate = useNavigate();

  function handleChangeStat(e) {
    const { name, value } = e.target;
    setStats(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const build = {
      name,
      class: charClass,
      evolution,
      stats: Object.fromEntries(
        Object.entries(stats).filter(([_, v]) => v !== '')
      ),
    };
    addBuild(build);
    navigate('/');
  }

  return (
    <form className="create-build-form" onSubmit={handleSubmit}>
      <h2>Skapa ny build</h2>
      <label>
        Namn:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>

      <label>
        Klass:
        <select value={charClass} onChange={e => setCharClass(e.target.value)}>
          <option>Archer</option>
          <option>Swordsman</option>
          <option>Mage</option>
        </select>
      </label>

      <label>
        Evolution:
        <select value={evolution} onChange={e => setEvolution(e.target.value)}>
          <option>Path 1</option>
          <option>Path 2</option>
          <option>Evolution 1</option>
          <option>Evolution 2</option>
          <option>Evolution 3</option>
        </select>
      </label>

      <fieldset>
        <legend>Stats (fyll i de som gäller)</legend>
        {Object.keys(stats).map(key => (
          <label key={key}>
            {key}:
            <input
              type="number"
              name={key}
              value={stats[key]}
              onChange={handleChangeStat}
              min="0"
              step="any"
            />
          </label>
        ))}
      </fieldset>

      <button type="submit">Spara build</button>
    </form>
  );
}
