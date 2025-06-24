import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Loads translation files via HTTP.
  .use(HttpBackend)
  // Auto-detects the user’s language.
  .use(LanguageDetector)
  // Passes the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    detection: {
      // The detection order: Use the browser language, then the HTML tag, etc.
      order: ['navigator', 'htmlTag', 'localStorage', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;