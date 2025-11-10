'use client'

import { useEffect } from 'react'

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Redirecting to admin panel...</p>
    </div>
  )
}

