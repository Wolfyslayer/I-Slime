import React, { useContext, useState } from 'react'
import { BuildContext } from './BuildSystem/BuildContext'
import BuildForm from './BuildSystem/BuildForm'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function CreateBuild() {
  const { title, description, selectedClass, selectedPath,
          selectedSkills, selectedPets, selectedItems,
          setTitle, setDescription, resetBuild } = useContext(BuildContext)
  const { t } = useTranslation()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user || !selectedClass || !selectedPath) {
      setError(t('Please complete all required fields and be logged in.'))
      return
    }

    const { error: insertError } = await supabase
      .from('builds')
      .insert([{
        title,
        description,
        classId: selectedClass,
        pathId: selectedPath,
        skills: selectedSkills,
        pets: selectedPets,
        items: selectedItems,
        user_id: user.id
      }])

    if (insertError) {
      setError(insertError.message)
    } else {
      alert(t('Build created!'))
      resetBuild()
    }
  }

  return (
    <div className="main-content" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>{t('Create New Build')}</h2>
      <form onSubmit={handleSubmit}>
        <BuildForm />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{t('Create Build')}</button>
      </form>
    </div>
  )
}
