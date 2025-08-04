import React, { useState, useContext } from 'react'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { BuildContext } from './BuildSystem/BuildContext'
import { classes, paths, skills, pets, items } from '../data/data'
import ReactModal from 'react-modal'
import './CreateBuild.css'

const itemSlots = [
  'weapon', 'gloves', 'armguards', 'boots', 'mask',
  'chest', 'pants', 'shoulder', 'helmet', 'belt'
]

const statOptions = [
  { value: 'crit', label: 'Crit Hit' },
  { value: 'combo', label: 'Combo' },
  { value: 'counter', label: 'Counter' },
  { value: 'skillcrit', label: 'Skill Crit Hit' },
  { value: 'recover', label: 'Recover' },
  { value: 'dodge', label: 'Dodge' },
  { value: 'stun', label: 'Stun' }
]

export default function CreateBuild() {
  const { user } = useUser()
  const navigate = useNavigate()

  const {
    title,
    setTitle,
    description,
    setDescription,
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
    resetBuild
  } = useContext(BuildContext)

  const [error, setError] = useState(null)
  const [modalItem, setModalItem] = useState(null)
  const [selectedSkillsOrdered, setSelectedSkillsOrdered] = useState([])
  const [selectedPetsOrdered, setSelectedPetsOrdered] = useState([])
  const [itemStats, setItemStats] = useState(() => {
    const defaultStats = {}
    itemSlots.forEach(slot => {
      defaultStats[slot] = {
        stat1: '',
        stat2: '',
        atkSpd: false
      }
    })
    return defaultStats
  })

  React.useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, setSelectedPath])

  const addToOrderedList = (id, orderedList, setOrdered, setContextArray) => {
    if (!orderedList.includes(id)) {
      setOrdered([...orderedList, id])
      setContextArray(prev => [...prev, id])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !selectedClass || !selectedPath) {
      setError('Titel, klass och väg är obligatoriska.')
      return
    }

    if (!user) {
      setError('Du måste vara inloggad för att skapa en build.')
      return
    }

    const buildData = {
      title: title.trim(),
      description: description.trim(),
      user_id: user.id,
      class_id: selectedClass,
      path_id: selectedPath,
      skills: selectedSkillsOrdered,
      pets: selectedPetsOrdered,
      items: itemStats
    }

    const { error: insertError } = await supabase.from('builds').insert([buildData])

    if (insertError) {
      setError('Misslyckades med att spara builden: ' + insertError.message)
    } else {
      resetBuild()
      navigate('/my-builds')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Skapa ny Build</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        Beskrivning:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        Klass:
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
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
        Väg:
        <select
          value={selectedPath}
          onChange={e => setSelectedPath(e.target.value)}
          required
          disabled={!selectedClass}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          {selectedClass &&
            paths
              .filter(p => p.classId === selectedClass)
              .map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
        </select>
      </label>

      {/* Skills */}
      <fieldset>
        <legend>Skills</legend>
        <div className="selection-grid">
          {selectedSkillsOrdered.map(id => {
            const skill = skills.find(s => s.id === id)
            return <img key={id} src={skill.image} alt={skill.name} className="selected-thumb" />
          })}
        </div>
        <div className="scroll-container">
          {skills.map(skill => (
            <div
              key={skill.id}
              className="item-card"
              onClick={() => setModalItem({ ...skill, type: 'skill' })}
            >
              <img src={skill.image} alt={skill.name} />
              <div className="plus-icon">+</div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Pets */}
      <fieldset>
        <legend>Pets</legend>
        <div className="selection-grid">
          {selectedPetsOrdered.map(id => {
            const pet = pets.find(p => p.id === id)
            return <img key={id} src={pet.image} alt={pet.name} className="selected-thumb" />
          })}
        </div>
        <div className="scroll-container">
          {pets.map(pet => (
            <div
              key={pet.id}
              className="item-card"
              onClick={() => setModalItem({ ...pet, type: 'pet' })}
            >
              <img src={pet.image} alt={pet.name} />
              <div className="plus-icon">+</div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Items */}
      <fieldset>
        <legend>Items</legend>
        {itemSlots.map(slot => (
          <div key={slot} className="item-slot">
            <strong>{slot.charAt(0).toUpperCase() + slot.slice(1)}:</strong>
            <select
              value={itemStats[slot].stat1}
              onChange={e => setItemStats(prev => ({
                ...prev,
                [slot]: { ...prev[slot], stat1: e.target.value }
              }))}
            >
              <option value="">Stat 1</option>
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              value={itemStats[slot].stat2}
              onChange={e => setItemStats(prev => ({
                ...prev,
                [slot]: { ...prev[slot], stat2: e.target.value }
              }))}
            >
              <option value="">Stat 2</option>
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <label>
              <input
                type="checkbox"
                checked={itemStats[slot].atkSpd}
                onChange={e => setItemStats(prev => ({
                  ...prev,
                  [slot]: { ...prev[slot], atkSpd: e.target.checked }
                }))}
              />
              Atk Spd
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
        Skapa Build
      </button>

      {/* Modal */}
      <ReactModal
        isOpen={!!modalItem}
        onRequestClose={() => setModalItem(null)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {modalItem && (
          <div>
            <img src={modalItem.image} alt={modalItem.name} style={{ width: '100%' }} />
            <h3>{modalItem.name}</h3>
            <p>{modalItem.description}</p>
            <button
              onClick={() => {
                if (modalItem.type === 'skill') {
                  addToOrderedList(modalItem.id, selectedSkillsOrdered, setSelectedSkillsOrdered, setSelectedSkills)
                } else {
                  addToOrderedList(modalItem.id, selectedPetsOrdered, setSelectedPetsOrdered, setSelectedPets)
                }
                setModalItem(null)
              }}
            >
              + Lägg till
            </button>
          </div>
        )}
      </ReactModal>
    </form>
  )
}
