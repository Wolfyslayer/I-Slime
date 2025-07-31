import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar({ session }) {
  async function handleLogout() {
      await supabase.auth.signOut();
        }

          return (
              <header className="navbar">
                    <h1>Build Planner</h1>
                          {session && (
                                  <nav>
                                            <Link to="/">Startsida</Link>
                                                      <Link to="/create">Skapa Build</Link>
                                                                <button onClick={handleLogout}>Logga ut</button>
                                                                        </nav>
                                                                              )}
                                                                                  </header>
                                                                                    );
                                                                                    }
                                                                                    