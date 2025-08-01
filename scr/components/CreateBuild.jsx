import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function CreateBuild() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      alert("Du måste vara inloggad för att skapa en build.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('builds')
      .insert({
        title,
        description,
        user_id: user.id,
        likes: 0,
        reports: 0
      });

    setLoading(false);

    if (insertError) {
      alert("Fel vid skapande: " + insertError.message);
    } else {
      alert("Build skapad!");
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Skapa ny Build</h2>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sparar...' : 'Spara Build'}
      </button>
    </form>
  );
}
