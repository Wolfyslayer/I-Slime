import React, { createContext, useState, useContext } from 'react'
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

// Här lägger vi till useBuild-hooken som du kan importera och använda
export function useBuild() {
  const context = useContext(BuildContext)
  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider')
  }
  return context
}
