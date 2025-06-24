import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

export default function GreetingCard() {
  const { planetId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Capitalize the planetId for proper translation lookup.
  const planetKey = planetId.charAt(0).toUpperCase() + planetId.slice(1);
  const planetName = t(`PlanetNames.${planetKey}`);
  
  const [toName, setToName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [bgImage, setBgImage] = useState('default');
  const [previewMode, setPreviewMode] = useState(false);
  
  const backgroundOptions = {
    default: '/images/stardust-bg.jpg',
    nebula: '/images/nebula-bg.jpg',
    galaxy: '/images/galaxy-bg.jpg',
    planet: `/images/${planetId}-bg.jpg`,
    sun: '/images/sun-bg.jpg'
  };
  
  const remainingDays = window.history.state?.usr?.remainingDays;
  let headerText = t('GreetingCardPreviewTitle', { planet: planetName });
  if (remainingDays !== undefined && remainingDays !== null) {
    if (remainingDays === 0) {
      headerText = t('HeaderToday', { planet: planetName });
    } else if (remainingDays === 1) {
      headerText = t('HeaderTomorrow', { planet: planetName });
    } else if (remainingDays > 1) {
      headerText = t('HeaderLater', { days: remainingDays, planet: planetName });
    }
  }
  
  const handlePreview = (e) => {
    e.preventDefault();
    if (!toName || !receiverEmail || !greetingMessage) {
      alert(t('FillAllFields'));
      return;
    }
    setPreviewMode(true);
  };
  
  const handleUpdate = () => setPreviewMode(false);
  
  const handleSend = () => {
    alert(t('CardSent'));
    setToName('');
    setReceiverEmail('');
    setGreetingMessage('');
    setBgImage('default');
    setPreviewMode(false);
    navigate('/');
  };
  
  const handleReturnHome = () => navigate('/');
  
  if (!previewMode) {
    // INPUT MODE with header and footer.
    return (
      <div style={{ background: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>{t('Title')}</h1>
          <LanguageSelector />
        </header>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#000',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h2>{t('GreetingCardInputTitle', { planet: planetName })}</h2>
          <form onSubmit={handlePreview}>
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label>
                {t('To')}: 
                <input
                  type="text"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  style={{ marginLeft: '5px', width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label>
                {t('Receiver')}: 
                <input
                  type="email"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  style={{ marginLeft: '5px', width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label>
                {t('GreetingMessage')}: 
                <textarea
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  style={{ marginLeft: '5px', width: '100%' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label>
                {t('BackgroundImage')}: 
                <select
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                  style={{ marginLeft: '5px' }}
                >
                  <option value="default">{t('DefaultBackground')}</option>
                  <option value="nebula">{t('Nebula')}</option>
                  <option value="galaxy">{t('Galaxy')}</option>
                  <option value="planet">{t('PlanetBackground')}</option>
                  <option value="sun">{t('SunBackground')}</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#001f3f",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {t('Preview')}
            </button>
            <button
              type="button"
              onClick={handleReturnHome}
              style={{
                backgroundColor: "#001f3f",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {t('ReturnHome')}
            </button>
          </form>
        </div>
        
        {/* FOOTER */}
        <footer style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          <small>{t('Footnote')}</small>
        </footer>
      </div>
    );
  } else {
    // PREVIEW MODE.
    const previewContainerStyle = {
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center"
    };
  
    // Always use the selected background image.
    const innerCardStyle = {
      backgroundImage: `url(${backgroundOptions[bgImage]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      margin: "0 auto",
      color: "yellow"
    };
  
    return (
      <div style={previewContainerStyle}>
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>{t('Title')}</h1>
          <LanguageSelector />
        </header>
  
        <div style={innerCardStyle}>
          <h2>{headerText}</h2>
          <div style={{ marginTop: '20px' }}>
            <h3>{toName}</h3>
            <p>{greetingMessage}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <button
              onClick={handleUpdate}
              style={{
                backgroundColor: "#001f3f",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {t('Update')}
            </button>
            <button
              onClick={handleSend}
              style={{
                backgroundColor: "#001f3f",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {t('Send')}
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleReturnHome}
              style={{
                backgroundColor: "#001f3f",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {t('ReturnHome')}
            </button>
          </div>
        </div>
  
        {/* FOOTER */}
        <footer style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          <small>{t('Footnote')}</small>
        </footer>
      </div>
    );
  }
}