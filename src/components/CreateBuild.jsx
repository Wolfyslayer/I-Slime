import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function CreateBuild() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleCreate = async (e) => {
    e.preventDefault()
    const user = supabase.auth.user()
    if (!user) {
      setError(t('You must be logged in to create a build.'))
      return
    }
    const { error } = await supabase
      .from('builds')
      .insert([{ title, description, user_id: user.id }])
    if (error) setError(error.message)
    else {
      alert(t('Build created!'))
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder={t('Title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder={t('Description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">{t('Create Build')}</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  )
}
