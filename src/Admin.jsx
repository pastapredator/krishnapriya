import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import AdminPanel from './components/AdminPanel'
import './styles/admin.css'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session)
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <div className="admin-app">
      {!session ? (
        <Auth onAuthSuccess={(data) => setSession(data.session)} />
      ) : (
        <AdminPanel user={session.user} />
      )}
    </div>
  )
}
