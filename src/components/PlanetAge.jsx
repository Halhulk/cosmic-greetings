import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { fetchPlanetAge } from '../api'

// Day.js locale importları:
import 'dayjs/locale/tr'
import 'dayjs/locale/fr'
import 'dayjs/locale/de'
import 'dayjs/locale/es'
import 'dayjs/locale/it'
import 'dayjs/locale/ja'
import 'dayjs/locale/ar'
import 'dayjs/locale/zh'
import 'dayjs/locale/ko'
import 'dayjs/locale/he'
import 'dayjs/locale/hi'
import 'dayjs/locale/th'
import 'dayjs/locale/fa'
import 'dayjs/locale/az'
import 'dayjs/locale/kk'
import 'dayjs/locale/bs'
import 'dayjs/locale/bg'
import 'dayjs/locale/hr'
import 'dayjs/locale/sr'
import 'dayjs/locale/hu'
import 'dayjs/locale/fi'
import 'dayjs/locale/mk'
import 'dayjs/locale/pl'

export default function PlanetAge({ planet, birthday, setBirthday }) {
  const { t, i18n } = useTranslation()
  const [data, setData]       = useState(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supportedLocales = [
      'en', 'tr', 'fr', 'de', 'es', 'it', 'ja', 'ar', 'zh', 'ko', 'he',
      'hi', 'th', 'fa', 'az', 'kk', 'bs', 'bg', 'hr', 'sr', 'hu', 'fi', 'mk', 'pl'
    ]
    const locale = supportedLocales.includes(i18n.language) ? i18n.language : 'en'
    dayjs.locale(locale)
  }, [i18n.language])

  useEffect(() => {
    const calculate = async () => {
      if (!birthday || !planet) return
      setError('')
      setData(null)
      setLoading(true)

      try {
        const result = await fetchPlanetAge(planet, birthday)
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    calculate()
  }, [birthday, planet])

  return (
    <div className="card">
      <h3>{t('yourPlanetBirthday')}</h3>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </div>

      {loading && <p>{t('loading')}...</p>}
      {error && <p className="error">{error}</p>}

      {data && !loading && (
        <ul className="result">
          <li>
            {t('nextDate')}:&nbsp;
            {dayjs(data.nextBirthdayDate).locale(i18n.language).format('LL')}
          </li>
          <li>
            {t('daysToNext')}:&nbsp;
            {data.daysToNextBirthday}
          </li>
        </ul>
      )}
    </div>
  )
}