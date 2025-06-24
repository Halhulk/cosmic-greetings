// /src/App.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AllPlanets from './components/AllPlanets';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import './App.css';

export default function App() {
  const { t, i18n } = useTranslation();
  const [birth, setBirth] = useState('');

  // Locale değişince dayjs'e bildir
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <div className="container">
      {/* 🌠 Emoji + Doğum tarihi girişi */}
      <section className="controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <span
          title="Enter your birth date"
          style={{ fontSize: '1.5rem', cursor: 'default' }}
          role="img"
          aria-label="cosmic hint"
        >
          🌠
        </span>
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          max={dayjs().format('YYYY-MM-DD')}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </section>

      {/* Doğum tarihi varsa tüm gezegenleri göster */}
      {birth && <AllPlanets birth={birth} setBirthday={setBirth} />}
    </div>
  );
}