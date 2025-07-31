import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function BuildList() {
  const [builds, setBuilds] = useState([])
    const [loading, setLoading] = useState(true)

      useEffect(() => {
          fetchBuilds()
            }, [])

              async function fetchBuilds() {
                  setLoading(true)
                      const { data, error } = await supabase
                            .from('builds')
                                  .select('id, title, description, created_at')

                                      if (error) {
                                            console.error(error)
                                                } else {
                                                      setBuilds(data)
                                                          }
                                                              setLoading(false)
                                                                }

                                                                  if (loading) return <p>Laddar builds...</p>

                                                                    return (
                                                                        <div>
                                                                              <h2>Builds</h2>
                                                                                    {builds.length === 0 && <p>Inga builds än.</p>}
                                                                                          <ul>
                                                                                                  {builds.map((build) => (
                                                                                                            <li key={build.id}>
                                                                                                                        <Link to={`/build/${build.id}`}>
                                                                                                                                      <strong>{build.title}</strong>
                                                                                                                                                  </Link>
                                                                                                                                                              <p>{build.description}</p>
                                                                                                                                                                          <small>Skapad: {new Date(build.created_at).toLocaleDateString()}</small>
                                                                                                                                                                                    </li>
                                                                                                                                                                                            ))}
                                                                                                                                                                                                  </ul>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                        )
                                                                                                                                                                                                        }
                                                                                                                                                                                                        