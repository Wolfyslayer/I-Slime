import React, { createContext, useState } from 'react'
import { classes, paths, skills, pets, items } from '../../data/data'

// BuildContext för att hantera form-state globalt
export const BuildContext = createContext()

export function BuildProvider({ children }) {
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
  }

  return (
    <BuildContext.Provider
      value={{
        classes,
        paths,
        skills,
        pets,
        items,
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
      }}
    >
      {children}
    </BuildContext.Provider>
  )
}
