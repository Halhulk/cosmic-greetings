// /src/App.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AllPlanets from './components/AllPlanets';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import 'dayjs/locale/tr'; // Other locales will update dynamically based on language.
import './App.css';

export default function App() {
  const { t, i18n } = useTranslation();

  // Update dayjs locale when the language changes.
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  // Birth input state (initially empty) and submittedBirth to trigger calculations.
  const [birth, setBirth] = useState("");
  const [submittedBirth, setSubmittedBirth] = useState("");

  const handleCalculate = () => {
    if (!birth || !dayjs(birth, 'YYYY-MM-DD', true).isValid() || dayjs(birth).isAfter(dayjs())) {
      alert(t('enterValidBirthday'));
      return;
    }
    setSubmittedBirth(birth);
  };

  return (
    <div className="container">
      {/* Only the controls (date input and calculate button) are rendered globally */}
      <section className="controls">
        <label>
          {t('birthdate')}
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            max={dayjs().format('YYYY-MM-DD')}
          />
        </label>
        <button
          onClick={handleCalculate}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          {t('calculate')}
        </button>
      </section>
      {submittedBirth && <AllPlanets birth={submittedBirth} />}
    </div>
  );
}