import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function BuildDetail() {
  const { id } = useParams();
    const [build, setBuild] = useState(null);

      useEffect(() => {
          fetchBuild();
            }, []);

              async function fetchBuild() {
                  const { data, error } = await supabase.from('builds').select('*').eq('id', id).single();
                      if (!error) setBuild(data);
                        }

                          async function handleLike() {
                              const user = (await supabase.auth.getUser()).data.user;

                                  await supabase.from('likes').insert({ user_id: user.id, build_id: build.id }).catch(() => {});
                                      await supabase.from('builds').update({ likes: build.likes + 1 }).eq('id', build.id);
                                          fetchBuild();
                                            }

                                              async function handleReport() {
                                                  const reason = prompt('Varför vill du rapportera denna build?');
                                                      const user = (await supabase.auth.getUser()).data.user;

                                                          if (reason) {
                                                                await supabase.from('reports').insert({ user_id: user.id, build_id: build.id, reason });
                                                                      await supabase.from('builds').update({ reports: build.reports + 1 }).eq('id', build.id);
                                                                            alert('Tack, din rapport har skickats.');
                                                                                  fetchBuild();
                                                                                      }
                                                                                        }

                                                                                          if (!build) return <p>Laddar...</p>;

                                                                                            return (
                                                                                                <div>
                                                                                                      <h2>{build.title}</h2>
                                                                                                            <p>{build.description}</p>
                                                                                                                  <button onClick={handleLike}>Gilla</button>
                                                                                                                        <button onClick={handleReport}>Rapportera</button>
                                                                                                                            </div>
                                                                                                                              );
                                                                                                                              }
                                                                                                                              