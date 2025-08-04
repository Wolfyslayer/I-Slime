import React, { useState, useContext, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { BuildContext } from './BuildSystem/BuildContext'
import { classes, paths, skills, pets, items } from '../data/data'

Modal.setAppElement('#root')

const effectOptions = [
  'crit hit',
  'combo',
  'counter',
  'skill crit hit',
  'recover',
  'dodge',
  'stun'
]

const itemCategories = [
  'weapon',
  'gloves',
  'armguards',
  'boots',
  'mask',
  'chest',
  'pants',
  'shoulder',
  'helmet',
  'belt'
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

  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null) // skill or pet object
  const [modalType, setModalType] = useState(null) // 'skill' or 'pet'

  // När klassen ändras, sätt första path automatiskt
  useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, setSelectedPath])

  // Toggle select för pets och skills (i slots)
  // Eftersom vi nu har slots med max 4 (för både pets och skills) så måste vi lägga till i ordning

  // För pets och skills har vi 4 "slots" (max 4)
  const maxSlots = 4

  // Hantera klick på plus i modal för pets eller skills
  const handleAddToSlots = (id, type) => {
    if (type === 'pet') {
      if (selectedPets.includes(id)) {
        // redan vald, ignore
        return
      }
      if (selectedPets.length < maxSlots) {
        setSelectedPets([...selectedPets, id])
      } else {
        // om fulla, ta bort första och lägg till nya
        setSelectedPets([...selectedPets.slice(1), id])
      }
    } else if (type === 'skill') {
      if (selectedSkills.includes(id)) return
      if (selectedSkills.length < maxSlots) {
        setSelectedSkills([...selectedSkills, id])
      } else {
        setSelectedSkills([...selectedSkills.slice(1), id])
      }
    }
    setModalOpen(false)
  }

  // Toggle remove från slots (klicka på liten ruta för att ta bort)
  const handleRemoveFromSlots = (id, type) => {
    if (type === 'pet') {
      setSelectedPets(selectedPets.filter(pid => pid !== id))
    } else if (type === 'skill') {
      setSelectedSkills(selectedSkills.filter(sid => sid !== id))
    }
  }

  // Öppna modal med data
  const openModal = (data, type) => {
    setModalData(data)
    setModalType(type)
    setModalOpen(true)
  }

  // Hantera submit
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

    // Bygg data
    const buildData = {
      title: title.trim(),
      description: description.trim(),
      user_id: user.id,
      class_id: selectedClass,
      path_id: selectedPath,
      skills: selectedSkills,
      pets: selectedPets,
      items: selectedItems
    }

    const { error: insertError } = await supabase.from('builds').insert([buildData])

    if (insertError) {
      setError('Misslyckades med att spara builden: ' + insertError.message)
    } else {
      resetBuild()
      navigate('/my-builds')
    }
  }

  // --- Items handlers ---

  // För varje kategori, vi ska kunna välja ett item, 2 effekter och checkbox atk spd

  // Hämta valt item per kategori (objekt eller undefined)
  const getSelectedItemForCategory = (category) => selectedItems.find(i => i.category === category)

  // Hantera val av item
  const handleItemChange = (category, itemId) => {
    const current = getSelectedItemForCategory(category)
    const filtered = selectedItems.filter(i => i.category !== category)
    filtered.push({
      category,
      itemId,
      effects: current ? current.effects : ['', ''],
      atkSpd: current ? current.atkSpd : false
    })
    setSelectedItems(filtered)
  }

  // Hantera val av effekt (0 eller 1)
  const handleEffectChange = (category, index, value) => {
    const current = getSelectedItemForCategory(category)
    if (!current) return // kan inte ändra effekt utan valt item
    const filtered = selectedItems.filter(i => i.category !== category)
    const newEffects = [...current.effects]
    newEffects[index] = value
    filtered.push({
      category,
      itemId: current.itemId,
      effects: newEffects,
      atkSpd: current.atkSpd
    })
    setSelectedItems(filtered)
  }

  // Hantera checkbox atk spd
  const handleAtkSpdChange = (category, checked) => {
    const current = getSelectedItemForCategory(category)
    if (!current) return
    const filtered = selectedItems.filter(i => i.category !== category)
    filtered.push({
      category,
      itemId: current.itemId,
      effects: current.effects,
      atkSpd: checked
    })
    setSelectedItems(filtered)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Skapa ny Build</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
          placeholder="Ange titel"
        />
      </label>

      <label>
        Beskrivning:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 20, fontSize: 14 }}
          placeholder="Beskriv din build"
          rows={4}
        />
      </label>

      <label>
        Klass:
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
        >
          <option value="">Välj klass</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
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
          style={{ width: '100%', padding: 8, marginBottom: 20, fontSize: 16 }}
        >
          <option value="">Välj väg</option>
          {selectedClass &&
            paths.filter(p => p.classId === selectedClass)
              .map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
        </select>
      </label>

      {/* --- Skills sektion --- */}
      <section style={{ marginBottom: 30 }}>
        <h3>Skills</h3>
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 10,
          flexWrap: 'wrap'
        }}>
          {/* Visade slots (max 4) */}
          {Array(4).fill(0).map((_, idx) => {
            const skillId = selectedSkills[idx]
            const skillObj = skills.find(s => s.id === skillId)
            return (
              <div
                key={idx}
                style={{
                  width: 60,
                  height: 60,
                  border: '2px solid #333',
                  borderRadius: 6,
                  backgroundColor: '#f0f0f0',
                  position: 'relative',
                  cursor: skillId ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => skillId && handleRemoveFromSlots(skillId, 'skill')}
                title={skillId ? 'Klicka för att ta bort' : ''}
              >
                {skillId ? (
                  <img
                    src={skillObj.icon}
                    alt={skillObj.name}
                    style={{ maxWidth: '80%', maxHeight: '80%' }}
                  />
                ) : (
                  <span style={{ color: '#999' }}>Tom</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Scrollbar med alla skills */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 10,
          paddingBottom: 5,
          borderBottom: '1px solid #ccc'
        }}>
          {skills.map(skill => (
            <div
              key={skill.id}
              style={{ flex: '0 0 auto', width: 50, height: 50, cursor: 'pointer' }}
              onClick={() => openModal(skill, 'skill')}
              title={skill.name}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 4 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- Pets sektion --- */}
      <section style={{ marginBottom: 30 }}>
        <h3>Pets</h3>
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 10,
          flexWrap: 'wrap'
        }}>
          {/* Visade slots (max 4) */}
          {Array(4).fill(0).map((_, idx) => {
            const petId = selectedPets[idx]
            const petObj = pets.find(p => p.id === petId)
            return (
              <div
                key={idx}
                style={{
                  width: 60,
                  height: 60,
                  border: '2px solid #333',
                  borderRadius: 6,
                  backgroundColor: '#f0f0f0',
                  position: 'relative',
                  cursor: petId ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => petId && handleRemoveFromSlots(petId, 'pet')}
                title={petId ? 'Klicka för att ta bort' : ''}
              >
                {petId ? (
                  <img
                    src={petObj.icon}
                    alt={petObj.name}
                    style={{ maxWidth: '80%', maxHeight: '80%' }}
                  />
                ) : (
                  <span style={{ color: '#999' }}>Tom</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Scrollbar med alla pets */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 10,
          paddingBottom: 5,
          borderBottom: '1px solid #ccc'
        }}>
          {pets.map(pet => (
            <div
              key={pet.id}
              style={{ flex: '0 0 auto', width: 50, height: 50, cursor: 'pointer' }}
              onClick={() => openModal(pet, 'pet')}
              title={pet.name}
            >
              <img
                src={pet.icon}
                alt={pet.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 4 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- Items sektion --- */}
      <section style={{ marginBottom: 30 }}>
        <h3>Items</h3>
        {itemCategories.map(category => {
          const categoryItems = items.filter(item => item.category === category)
          const selectedItem = getSelectedItemForCategory(category)

          return (
            <div key={category} style={{ marginBottom: 16, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
              <strong style={{ textTransform: 'capitalize' }}>{category}</strong>
              <div>
                <select
                  value={selectedItem ? selectedItem.itemId : ''}
                  onChange={e => handleItemChange(category, e.target.value)}
                  style={{ marginRight: 10, padding: 6, minWidth: 160 }}
                >
                  <option value="">Välj {category} item</option>
                  {categoryItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <select
                  value={selectedItem && selectedItem.effects ? selectedItem.effects[0] : ''}
                  onChange={e => handleEffectChange(category, 0, e.target.value)}
                  disabled={!selectedItem}
                  style={{ padding: 6, minWidth: 130 }}
                >
                  <option value="">Effekt 1</option>
                  {effectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={selectedItem && selectedItem.effects ? selectedItem.effects[1] : ''}
                  onChange={e => handleEffectChange(category, 1, e.target.value)}
                  disabled={!selectedItem}
                  style={{ padding: 6, minWidth: 130 }}
                >
                  <option value="">Effekt 2</option>
                  {effectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'normal' }}>
                  <input
                    type="checkbox"
                    checked={selectedItem ? selectedItem.atkSpd : false}
                    onChange={e => handleAtkSpdChange(category, e.target.checked)}
                    disabled={!selectedItem}
                  />
                  Atk Spd
                </label>
              </div>
            </div>
          )
        })}
      </section>

      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          fontSize: 16,
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        Skapa Build
      </button>

      {/* --- Modal --- */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel={modalType === 'skill' ? 'Skill Info' : 'Pet Info'}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
          content: {
            maxWidth: 400,
            margin: 'auto',
            borderRadius: 8,
            padding: 20
          }
        }}
      >
        {modalData && (
          <div style={{ textAlign: 'center' }}>
            <h2>{modalData.name}</h2>
            <img
              src={modalData.card || modalData.icon}
              alt={modalData.name}
              style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
            />
            <p>{modalData.description || 'Ingen beskrivning'}</p>
            <button
              onClick={() => handleAddToSlots(modalData.id, modalType)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                fontSize: 16,
                borderRadius: 6,
                cursor: 'pointer',
                marginTop: 10
              }}
            >
              Lägg till
            </button>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                marginLeft: 10,
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                fontSize: 16,
                borderRadius: 6,
                cursor: 'pointer',
                marginTop: 10
              }}
            >
              Stäng
            </button>
          </div>
        )}
      </Modal>
    </form>
  )
          }
