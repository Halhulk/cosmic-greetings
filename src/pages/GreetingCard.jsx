import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/LanguageSelector'
import html2canvas from 'html2canvas'

export default function GreetingCard() {
  const { planetId } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const planetKey = planetId.charAt(0).toUpperCase() + planetId.slice(1)
  const planetName = t(`PlanetNames.${planetKey}`)

  const [toName, setToName] = useState('')
  const [greetingMessage, setGreetingMessage] = useState('')
  const [bgImage, setBgImage] = useState('default')
  const [previewMode, setPreviewMode] = useState(false)

  const cardRef = useRef(null)

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
    if (!toName || !greetingMessage) {
      alert(t('FillAllFields') || 'Lütfen tüm alanları doldurun.')
      return
    }
    setPreviewMode(true)
  }

  const handleReturnHome = () => navigate('/')
  const handleUpdate = () => setPreviewMode(false)
    const handleCopyImage = async () => {
    if (!navigator.clipboard || !window.ClipboardItem) {
      alert(t('ClipboardImageNotSupported') || 'Görsel kopyalama tarayıcınızda desteklenmiyor.')
      return
    }

    try {
      const canvas = await html2canvas(cardRef.current)
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard.write([item])
        alert(t('ImageCopiedToClipboard') || 'Kart görsel olarak panoya kopyalandı!')
      })
    } catch (err) {
      console.error(err)
      alert(t('ClipboardError') || 'Kopyalama sırasında hata oluştu.')
    }
  }

  const handleDownloadImage = async () => {
    try {
      const canvas = await html2canvas(cardRef.current)
      const link = document.createElement('a')
      link.download = `birthday-card-${planetId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error(err)
      alert(t('DownloadError') || 'İndirme başarısız oldu.')
    }
  }

  const sharedInputStyle = {
    backgroundColor: '#111',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '4px',
    padding: '6px',
    width: '100%',
    marginTop: '4px'
  }

  const buttonStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "8px"
  }
    if (!previewMode) {
    return (
      <div style={{
        background: 'linear-gradient(to right, #000428, #004e92)',
        minHeight: '100vh', padding: '20px', color: 'white'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>{t('Title')}</h1>
          <LanguageSelector />
        </header>

        <div style={{
          backgroundColor: '#00000099',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h2>{t('GreetingCardInputTitle', { planet: planetName })}</h2>
          <form onSubmit={handlePreview}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              {t('To') || 'Alıcı'}:
              <input type="text" value={toName} onChange={(e) => setToName(e.target.value)} style={sharedInputStyle} />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              {t('GreetingMessage') || 'Mesaj'}:
              <textarea value={greetingMessage} onChange={(e) => setGreetingMessage(e.target.value)} style={sharedInputStyle} />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              {t('BackgroundImage') || 'Arka Plan'}:
              <select value={bgImage} onChange={(e) => setBgImage(e.target.value)} style={sharedInputStyle}>
                <option value="default">{t('DefaultBackground') || 'Yıldız Tozu'}</option>
                <option value="nebula">{t('Nebula') || 'Bulutsu'}</option>
                <option value="galaxy">{t('Galaxy') || 'Galaksi'}</option>
                <option value="planet">{t('PlanetBackground') || 'Gezegen'} ({planetName})</option>
                <option value="sun">{t('SunBackground') || 'Güneş'}</option>
              </select>
            </label>
            <button type="submit" style={buttonStyle}>{t('Preview') || 'Önizleme'}</button>
            <button type="button" onClick={handleReturnHome} style={buttonStyle}>{t('ReturnHome') || 'Ana Sayfa'}</button>
          </form>
        </div>

        <footer style={{ textAlign: 'center', marginTop: '20px', color: '#ccc' }}>
          <small>{t('Footnote') || 'Bu kart yıldızlar arası sevgiyle gönderildi.'}</small>
        </footer>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(to right, #000428, #004e92)',
      minHeight: '100vh', padding: '20px', color: 'white'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>{t('Title')}</h1>
        <LanguageSelector />
      </header>

      <div
        ref={cardRef}
        style={{
          backgroundImage: `url(${backgroundOptions[bgImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          margin: "0 auto",
          color: "yellow"
        }}
      >
        <h2>{headerText}</h2>
        <div style={{ marginTop: '20px' }}>
          <h3>{toName}</h3>
          <p>{greetingMessage}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button onClick={handleUpdate} style={buttonStyle}>{t('Update') || 'Güncelle'}</button>
        <button onClick={handleCopyImage} style={buttonStyle}>{t('CopyToClipboardImage') || 'Görseli Panoya Kopyala'}</button>
        <button onClick={handleDownloadImage} style={buttonStyle}>{t('DownloadCard') || 'Kartı İndir'}</button>
        <button onClick={handleReturnHome} style={buttonStyle}>{t('ReturnHome') || 'Ana Sayfa'}</button>
      </div>

      <footer style={{ marginTop: '20px', textAlign: 'center', color: '#ccc' }}>
        <small>{t('Footnote') || 'Gönderildi: cosmic-greetings'}</small>
      </footer>
    </div>
  )
}