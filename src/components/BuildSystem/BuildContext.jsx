// src/components/BuildSystem/BuildContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react'
import { classes, paths, skills, pets, itemCategories } from '../../data/data'
import { supabase } from '../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

const BuildContext = createContext()

// Helper för att skapa initialt state för selectedItems
const createInitialSelectedItems = () => {
  const initial = {}
  itemCategories.forEach(category => {
    initial[category] = { stat1: '', stat2: '', atkSpd: false }
  })
  return initial
}

export function BuildProvider({ children }) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedPets, setSelectedPets] = useState([])
  const [selectedItems, setSelectedItems] = useState(createInitialSelectedItems())
  const [user, setUser] = useState(null)

  // Korrekt sätt att hämta session i Supabase v2
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user ?? null)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription?.unsubscribe()
    }
  }, [])

  const resetBuild = () => {
    setTitle('')
    setDescription('')
    setSelectedClass('')
    setSelectedPath('')
    setSelectedSkills([])
    setSelectedPets([])
    setSelectedItems(createInitialSelectedItems())
  }

  return (
    <BuildContext.Provider
      value={{
        user,
        classes,
        paths,
        skills,
        pets,
        itemCategories,
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
        resetBuild,
      }}
    >
      {children}
    </BuildContext.Provider>
  )
}

export function useBuild() {
  const context = useContext(BuildContext)
  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider')
  }
  return context
}
