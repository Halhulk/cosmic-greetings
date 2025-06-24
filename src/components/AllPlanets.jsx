import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPlanetAge } from '../api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const planets = [
  {
    id: 'earth',
    nameKey: 'PlanetNames.Earth',
    image: `${import.meta.env.BASE_URL}images/earth.png`,
    diameter: '12,742 km',
    gravity: '9.81 m/s²',
    orbitalPeriod: '365.25 days',
    lengthOfDay: '24 hours',
    meanTemperature: '15 °C'
  },
  {
    id: 'mars',
    nameKey: 'PlanetNames.Mars',
    image: `${import.meta.env.BASE_URL}images/mars.png`,
    diameter: '6,779 km',
    gravity: '3.71 m/s²',
    orbitalPeriod: '687 days',
    lengthOfDay: '24.7 hours',
    meanTemperature: '-60 °C'
  },
  {
    id: 'jupiter',
    nameKey: 'PlanetNames.Jupiter',
    image: `${import.meta.env.BASE_URL}images/jupiter.png`,
    diameter: '139,820 km',
    gravity: '24.79 m/s²',
    orbitalPeriod: '4,333 days',
    lengthOfDay: '9.9 hours',
    meanTemperature: '-110 °C'
    },
  {
    id: 'ceres',
    nameKey: 'PlanetNames.Ceres',
    image: `${import.meta.env.BASE_URL}images/ceres.png`,
    diameter: '945 km',
    gravity: '0.27 m/s²',
    orbitalPeriod: '1680 days',
    lengthOfDay: '9 hours',
    meanTemperature: '-100 °C'
  },
  {
    id: 'moon',
    nameKey: 'PlanetNames.Moon',
    image: `${import.meta.env.BASE_URL}images/moon.png`,
    diameter: '3,474 km',
    gravity: '1.62 m/s²',
    orbitalPeriod: '27.3 days', // or use synodic period ~29.5 days if preferred
    lengthOfDay: '708 hours',   // Approximately 29.5 Earth days
    meanTemperature: '-20 °C'
  }


];

export default function AllPlanets({ birth }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update dayjs locale when language changes.
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  // Validate birthday.
  if (!birth || !dayjs(birth, 'YYYY-MM-DD', true).isValid() || dayjs(birth).isAfter(dayjs())) {
    return <p>{t('EnterValidBirthday')}</p>;
  }

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError('');
      const newResults = {};
      try {
        await Promise.all(
          planets.map(async (planet) => {
            const data = await fetchPlanetAge(planet.id, birth);
            newResults[planet.id] = data;
          })
        );
        setResults(newResults);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [birth]);

  const generateShareMessage = (planet, data) => {
    return `${t(planet.nameKey)}: ${t('NextBirthdayOn')} ${data.nextBirthdayEarth}, ${t('Age')}: ${data.age}`;
  };

  const createGreetingCard = (planet, data) => {
    navigate(`/greeting/${planet.id}`, { state: { remainingDays: data.daysToNextBirthday } });
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #000428, #004e92)',
        minHeight: '100vh',
        padding: '20px',
        color: '#fff'
      }}
    >
      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>{t('Title')}</h1>
        <LanguageSelector />
      </header>

      {loading && <p>{t('Loading')}...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}></th>
                {planets.map((planet) => (
                  <th key={planet.id} style={{ textAlign: 'center', padding: '8px' }}>
                    <img
                      src={planet.image}
                      alt={t(planet.nameKey)}
                      style={{
                        width: '32px',
                        height: '32px',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                    <div>{t(planet.nameKey)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '8px' }}>{t('NextBirthdayEarth')}</td>
                {planets.map((planet) => (
                  <td key={planet.id} style={{ textAlign: 'center', padding: '8px' }}>
                    {results[planet.id]
                      ? dayjs(results[planet.id].nextBirthdayEarth).format('LL')
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '8px' }}>{t('AgeOnPlanet')}</td>
                {planets.map((planet) => (
                  <td key={planet.id} style={{ textAlign: 'center', padding: '8px' }}>
                    {results[planet.id] ? results[planet.id].age : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', padding: '8px' }}>{t('DaysToNext')}</td>
                {planets.map((planet) => (
                  <td key={planet.id} style={{ textAlign: 'center', padding: '8px' }}>
                    {results[planet.id] ? results[planet.id].daysToNextBirthday : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '8px' }}></td>
                {planets.map((planet) => (
                  <td key={planet.id} style={{ textAlign: 'center', padding: '8px' }}>
                    {results[planet.id] && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              generateShareMessage(planet, results[planet.id])
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter"
                          >
                            <i className="fab fa-twitter" aria-hidden="true"></i>
                          </a>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}&quote=${encodeURIComponent(
                              generateShareMessage(planet, results[planet.id])
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                          >
                            <i className="fab fa-facebook" aria-hidden="true"></i>
                          </a>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              generateShareMessage(planet, results[planet.id])
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp"
                          >
                            <i className="fab fa-whatsapp" aria-hidden="true"></i>
                          </a>
                          <a
                            href={`https://bsky.app/profile?text=${encodeURIComponent(
                              generateShareMessage(planet, results[planet.id])
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Bluesky"
                          >
                            <i className="fas fa-bolt" aria-hidden="true"></i>
                          </a>
                        </div>
                        <button
                          onClick={() => createGreetingCard(planet, results[planet.id])}
                          style={{
                            backgroundColor: "#001f3f",
                            color: "white",
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          {t('Greeting')}
                        </button>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          
          {/* Planet Basic Data Section with smaller font */}
          <div style={{ marginTop: '40px', textAlign: 'center', color: '#fff', fontSize: '0.9rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 20px' }}>{t('PlanetBasicData')}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {planets.map((planet) => (
                <div
                  key={planet.id}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '15px',
                    borderRadius: '8px',
                    width: '220px'
                  }}
                >
                  <h3 style={{ margin: '0 0 10px' }}>{t(planet.nameKey)}</h3>
                  <img
                    src={planet.image}
                    alt={t(planet.nameKey)}
                    style={{ width: '64px', height: '64px', marginBottom: '10px' }}
                  />
                  <p><strong>{t('Diameter')}:</strong> {planet.diameter}</p>
                  <p><strong>{t('Gravity')}:</strong> {planet.gravity}</p>
                  <p><strong>{t('OrbitalPeriod')}:</strong> {planet.orbitalPeriod}</p>
                  <p><strong>{t('LengthOfDay')}:</strong> {planet.lengthOfDay}</p>
                  <p><strong>{t('MeanTemperature')}:</strong> {planet.meanTemperature}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
{/* ABOUT SECTION */}
<div
  style={{
    marginTop: '40px',
    padding: '20px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff',
    whiteSpace: 'pre-line'
  }}
>
  <h2>{t('aboutTitle')}</h2>
  <p>{t('aboutText')}</p>
</div>
      {/* FOOTER */}
      <footer style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }}>
        <small>{t('Footnote')}</small>
      </footer>
    </div>
  );
}