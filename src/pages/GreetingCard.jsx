import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/LanguageSelector'

export default function GreetingCard() {
  const { planetId } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const planetKey = planetId.charAt(0).toUpperCase() + planetId.slice(1)
  const planetName = t(`PlanetNames.${planetKey}`)

  const [toName, setToName] = useState('')
  const [receiverEmail, setReceiverEmail] = useState('')
  const [greetingMessage, setGreetingMessage] = useState('')
  const [bgImage, setBgImage] = useState('default')
  const [previewMode, setPreviewMode] = useState(false)

  const backgroundOptions = {
    default: `${import.meta.env.BASE_URL}images/stardust-bg.jpg`,
    nebula: `${import.meta.env.BASE_URL}images/nebula-bg.jpg`,
    galaxy: `${import.meta.env.BASE_URL}images/galaxy-bg.jpg`,
    planet: `${import.meta.env.BASE_URL}images/${planetId}-bg.jpg`,
    sun: `${import.meta.env.BASE_URL}images/sun-bg.jpg`
  }

  const remainingDays = window.history.state?.usr?.remainingDays
  let headerText = t('GreetingCardPreviewTitle', { planet: planetName })
  if (remainingDays !== undefined && remainingDays !== null) {
    if (remainingDays === 0) headerText = t('HeaderToday', { planet: planetName })
    else if (remainingDays === 1) headerText = t('HeaderTomorrow', { planet: planetName })
    else if (remainingDays > 1) headerText = t('HeaderLater', { days: remainingDays, planet: planetName })
  }

  const handlePreview = (e) => {
    e.preventDefault()
    if (!toName || !receiverEmail || !greetingMessage) {
      alert(t('FillAllFields') || 'Lütfen tüm alanları doldurun.')
      return
    }
    setPreviewMode(true)
  }

  const handleUpdate = () => setPreviewMode(false)

  const handleSend = () => {
    const subject = `🎂 ${planetName} üzerinde doğum günü tebriği!`
    const body = `Merhaba ${toName},\n\n${greetingMessage}\n\n💫 Gönderildi: https://halhulk.github.io/cosmic-greetings/`
    const mailLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailLink

    setToName('')
    setReceiverEmail('')
    setGreetingMessage('')
    setBgImage('default')
    setPreviewMode(false)
    navigate('/')
  }

  const handleCopy = () => {
    const cardText = `${headerText}\n\n${toName},\n\n${greetingMessage}\n\n📨 https://halhulk.github.io/cosmic-greetings/`
    navigator.clipboard.writeText(cardText)
    alert(t('CopiedToClipboard') || 'Mesaj panoya kopyalandı!')
  }

  const handleReturnHome = () => navigate('/')

  if (!previewMode) {
    return (
      <div style={{ background: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>{t('Title')}</h1>
          <LanguageSelector />
        </header>

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          maxWidth: '500px', margin: '0 auto', backgroundColor: '#000', padding: '20px', borderRadius: '8px'
        }}>
          <h2>{t('GreetingCardInputTitle', { planet: planetName })}</h2>
          <form onSubmit={handlePreview}>
            <label style={{ width: '100%', marginBottom: '10px', display: 'block' }}>
              {t('To') || 'Alıcı'}:
              <input type="text" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '100%' }} />
            </label>
            <label style={{ width: '100%', marginBottom: '10px', display: 'block' }}>
              {t('Receiver') || 'E-posta'}:
              <input type="email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} style={{ width: '100%' }} />
            </label>
            <label style={{ width: '100%', marginBottom: '10px', display: 'block' }}>
              {t('GreetingMessage') || 'Mesaj'}:
              <textarea value={greetingMessage} onChange={(e) => setGreetingMessage(e.target.value)} style={{ width: '100%' }} />
            </label>
            <label style={{ width: '100%', marginBottom: '10px', display: 'block' }}>
              {t('BackgroundImage') || 'Arka Plan'}:
              <select value={bgImage} onChange={(e) => setBgImage(e.target.value)} style={{ width: '100%' }}>
                <option value="default">{t('DefaultBackground') || 'Yıldız Tozu'}</option>
                <option value="nebula">{t('Nebula') || 'Bulutsu'}</option>
                <option value="galaxy">{t('Galaxy') || 'Galaksi'}</option>
                <option value="planet">{t('PlanetBackground') || 'Gezegen'}</option>
                <option value="sun">{t('SunBackground') || 'Güneş'}</option>
              </select>
            </label>
            <button type="submit" style={buttonStyle}>{t('Preview') || 'Önizleme'}</button>
            <button type="button" onClick={handleReturnHome} style={buttonStyle}>{t('ReturnHome') || 'Ana Sayfa'}</button>
          </form>
        </div>

        <footer style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          <small>{t('Footnote') || 'Tüm gezegenlerden sevgiyle gönderildi.'}</small>
        </footer>
      </div>
    )
  }

  // PREVIEW MODE
  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px", textAlign: "center" }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>{t('Title')}</h1>
        <LanguageSelector />
      </header>

      <div style={{
        backgroundImage: `url(${backgroundOptions[bgImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "0 auto",
        color: "yellow"
      }}>
        <h2>{headerText}</h2>
        <div style={{ marginTop: '20px' }}>
          <h3>{toName}</h3>
          <p>{greetingMessage}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleUpdate} style={buttonStyle}>{t('Update') || 'Güncelle'}</button>
          <button onClick={handleSend} style={buttonStyle}>{t('Send') || 'Gönder'}</button>
          <button onClick={handleCopy} style={{ ...buttonStyle, backgroundColor: '#777' }}>
            {t('CopyToClipboard') || 'Panoya Kopyala'}
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleReturnHome} style={buttonStyle}>{t('ReturnHome') || 'Ana Sayfa'}</button>
        </div>
      </div>

      <footer style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        <small>{t('Footnote') || 'Tüm galaksiye açık!'}</small>
      </footer>
    </div>
  )
}

const buttonStyle = {
  backgroundColor: "#001f3f",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}