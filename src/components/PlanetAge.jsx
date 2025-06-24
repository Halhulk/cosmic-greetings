import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { fetchPlanetAge } from '../api'

export default function PlanetAge({ planet, birth }) {
  const { t } = useTranslation()
  const [data, setData]       = useState(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const calculate = async () => {
    console.log("Calculation started for:", planet, birth)
    setError('')
    setData(null)
    setLoading(true)

    try {
      const result = await fetchPlanetAge(planet, birth)
      console.log("Fetch result:", result)
      setData(result)
    } catch (err) {
      console.error("Calculation error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
      console.log("Calculation finished")
    }
  }

  return (
    <div className="card">
      <h3>{t('yourPlanetBirthday')}</h3>

      <button className="btn" onClick={calculate} disabled={loading}>
        {loading 
          ? '⏳ ' + t('calculate') + '...'
          : t('calculate')
        }
      </button>

      {error && <p className="error">{error}</p>}

      {data && !loading && (
        <ul className="result">
          <li>
            {t('nextDate')}:&nbsp;
            {/*
              Use the localized "LL" format. If you prefer a custom format,
              you might try a different token (e.g. 'DD MMM YYYY') 
              but note that not all custom tokens are localized by default.
            */}
            {dayjs(data.nextBirthdayDate).format('LL')}
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