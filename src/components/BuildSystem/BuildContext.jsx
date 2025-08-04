import React, { createContext, useState, useContext } from 'react'
import { classes, paths, skills, pets, items } from '../../data/data'

export const BuildContext = createContext()

export const BuildProvider = ({ children }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedPets, setSelectedPets] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const resetBuild = () => {
    setTitle('')
    setDescription('')
    setSelectedClass('')
    setSelectedPath('')
    setSelectedSkills([])
    setSelectedPets([])
    setSelectedItems([])
    localStorage.removeItem('buildDraft')
  }

  return (
    <BuildContext.Provider
      value={{
        title, setTitle,
        description, setDescription,
        selectedClass, setSelectedClass,
        selectedPath, setSelectedPath,
        selectedSkills, setSelectedSkills,
        selectedPets, setSelectedPets,
        selectedItems, setSelectedItems,
        resetBuild
      }}
    >
      {children}
    </BuildContext.Provider>
  )
}
