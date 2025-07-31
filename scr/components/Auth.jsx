// src/components/Auth.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [session, setSession] = useState(null)
    const [email, setEmail] = useState('')

      useEffect(() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
                    })

                        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
                              setSession(session)
                                  })

                                      return () => {
                                            authListener.subscription.unsubscribe()
                                                }
                                                  }, [])

                                                    async function signIn() {
                                                        if (!email) return alert('Ange din e-post')
                                                            const { error } = await supabase.auth.signInWithOtp({ email })
                                                                if (error) alert('Fel vid inloggning: ' + error.message)
                                                                    else alert('Ett inloggningsmail har skickats')
                                                                      }

                                                                        async function signOut() {
                                                                            await supabase.auth.signOut()
                                                                              }

                                                                                if (session)
                                                                                    return (
                                                                                          <div>
                                                                                                  <p>Inloggad som {session.user.email}</p>
                                                                                                          <button onClick={signOut}>Logga ut</button>
                                                                                                                </div>
                                                                                                                    )

                                                                                                                      return (
                                                                                                                          <div>
                                                                                                                                <input
                                                                                                                                        type="email"
                                                                                                                                                placeholder="Din e-post"
                                                                                                                                                        value={email}
                                                                                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                      />
                                                                                                                                                                            <button onClick={signIn}>Logga in / Registrera</button>
                                                                                                                                                                                </div>
                                                                                                                                                                                  )
                                                                                                                                                                                  }
                                                                                                                                                                                  