// /src/components/LanguageSelector.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ja', label: '日本語' },
    { code: 'ar', label: 'العربية' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
    { code: 'he', label: 'עברית' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'th', label: 'ไทย' },
    { code: 'fa', label: 'فارسی' },
    { code: 'az', label: 'Azərbaycanca' },
    { code: 'kk', label: 'Қазақша' },
    { code: 'tk', label: 'Türkmençe' },
    { code: 'bs', label: 'Bosanski' },
    { code: 'bg', label: 'Български' },
    { code: 'hr', label: 'Hrvatski' },
    { code: 'sr', label: 'Српски' },
    { code: 'hu', label: 'Magyar' },
    { code: 'fi', label: 'Suomi' },
    { code: 'mk', label: 'Македонски' },
    { code: 'pl', label: 'Polski' }
  ];

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ margin: '10px 0', textAlign: 'center' }}>
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: 'none'
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}