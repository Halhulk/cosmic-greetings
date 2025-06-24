// frontend/src/components/Scheduler.jsx

import React, { useState, useEffect } from 'react'
import { useTranslation }      from 'react-i18next'
import { scheduleGreeting, subscribePush } from '../api'
import dayjs                  from 'dayjs'

// Helper to decode your VAPID public key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const b64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const raw = atob(b64)
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)))
}

export default function Scheduler({ planet, birth }) {
  const { t } = useTranslation()

  // form state
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [code,     setCode]     = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [msg,      setMsg]      = useState('')

  // push‐subscription on mount
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then(reg => reg.pushManager.getSubscription()
          .then(sub => {
            if (!sub) {
              const key = import.meta.env.VITE_VAPID_PUBLIC
              const appKey = urlBase64ToUint8Array(key)
              return reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: appKey
              })
            }
            return sub
          })
        )
        .then(subscribePush)
        .catch(console.error)
    }
  }, [])

  // schedule greeting
  const onSubmit = async e => {
    e.preventDefault()
    setMsg('')
    try {
      await scheduleGreeting({
        name,
        email,
        birthdate: birth,
        planetId: planet,
        code: code || undefined,
        imageUrl: imageUrl || undefined
      })
      setMsg('✅ ' + t('scheduled'))
    } catch (err) {
      setMsg('❌ ' + err.message)
    }
  }

  // social‐share URLs
  const shareText = encodeURIComponent(
    `${t('schedule')} for ${name} on ${planet.toUpperCase()}!`
  )
  const shareUrl = encodeURIComponent(window.location.href)

  return (
    <div className="card">
      <h3>{t('schedule')}</h3>
      <form onSubmit={onSubmit} className="scheduler-form">
        <input
          type="text"
          placeholder={t('name')}
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder={t('email')}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder={t('code')}
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <button className="btn" type="submit">
          {t('send')}
        </button>
      </form>

      {msg && <p className={msg.startsWith('✅') ? 'msg' : 'error'}>{msg}</p>}

      {/* Social share options after scheduling */}
      {msg.startsWith('✅') && (
        <div className="share-buttons">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank" rel="noopener noreferrer"
          >Share on X</a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank" rel="noopener noreferrer"
          >Share on Facebook</a>
          <a
            href={`https://bsky.app/profile?text=${shareText}`}
            target="_blank" rel="noopener noreferrer"
          >Share on Bluesky</a>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank" rel="noopener noreferrer"
          >Share on WhatsApp</a>
          <button
            onClick={() => {
              setCode('')
              setName('')
              setEmail('')
              setImageUrl('')
              setMsg('')
            }}
            style={{ marginLeft: '12px', color: '#666', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {t('reset')}
          </button>
        </div>
      )}
    </div>
  )
}