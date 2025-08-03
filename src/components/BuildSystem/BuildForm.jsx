import React from 'react'
import { useBuild } from './BuildContext'

export default function BuildForm() {
  const {
    classes,
    paths,
    skills,
    pets,
    items,
    selectedClass,
    setSelectedClass,
    selectedPath,
    setSelectedPath,
    selectedSkills,
    setSelectedSkills,
    selectedPets,
    setSelectedPets,
    selectedItems,
    setSelectedItems,
  } = useBuild()

  // Toggle-funktion för checkbox-liknande val
  const toggleSelect = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else {
      setArray([...array, value])
    }
  }

  // När klass ändras sätt första path som default
  React.useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, paths, setSelectedPath])

  return (
    <div>
      <label>
        Klass
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="">Välj klass</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Väg
        <select
          value={selectedPath}
          onChange={e => setSelectedPath(e.target.value)}
          disabled={!selectedClass}
          required
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="">Välj väg</option>
          {paths
            .filter(p => p.classId === selectedClass)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
      </label>

      <fieldset>
        <legend>Skills</legend>
        {skills.map(skill => (
          <label key={skill.id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill.id)}
              onChange={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
            />
            {skill.name}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        {pets.map(pet => (
          <label key={pet.id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={selectedPets.includes(pet.id)}
              onChange={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
            />
            {pet.name}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Items</legend>
        {items.map(item => (
          <label key={item.id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelect(selectedItems, setSelectedItems, item.id)}
            />
            {item.name}
          </label>
        ))}
      </fieldset>
    </div>
  )
}
