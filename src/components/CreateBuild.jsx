import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { BuildProvider, useBuild } from './BuildSystem/BuildContext';
import BuildForm from './BuildSystem/BuildForm';

function CreateBuildInner() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { build } = useBuild();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!title || !build.class || !build.path) {
      setError('Titel, klass och utvecklingsväg krävs.');
      return;
    }

    const { error: insertError } = await supabase.from('builds').insert([
      {
        title,
        description,
        class_id: build.class,
        path_id: build.path,
        skills: build.skills,
        pets: build.pets,
        items: build.items,
        user_id: user.id
      }
    ]);

    if (insertError) {
      setError('Kunde inte spara builden.');
      console.error(insertError);
    } else {
      navigate('/builds');
    }
  };

  return (
    <div className="create-build">
      <h1>Skapa Build</h1>

      {error && <div className="error">{error}</div>}

      <label>
        Titel:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>

      <label>
        Beskrivning:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>

      <BuildForm />

      <button onClick={handleSave}>Spara Build</button>
    </div>
  );
}

export default function CreateBuild() {
  return (
    <BuildProvider>
      <CreateBuildInner />
    </BuildProvider>
  );
}
