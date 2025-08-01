import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function CreateBuild() {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()

    const { data } = await supabase.auth.getUser()
    const user = data?.user

    if (!user) {
      setError(t('mustBeLoggedIn'))
      return
    }

    const { error } = await supabase
      .from('builds')
      .insert([{ title, description, user_id: user.id }])

    if (error) setError(error.message)
    else {
      alert(t('buildCreated'))
      setTitle('')
      setDescription('')
      setError('')
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder={t('title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder={t('description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">{t('createBuild')}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
