import { useState } from 'react'
import { getSummary, getSymptoms, getSecondOpinion } from '../api/insights'
import { getUserId } from '../api/auth'
import Spinner from '../components/Spinner'

function Insights() {
  const userId = getUserId()
  const [summary, setSummary] = useState(null)
  const [symptoms, setSymptoms] = useState(null)
  const [secondOpinion, setSecondOpinion] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [loadingSymptoms, setLoadingSymptoms] = useState(false)
  const [loadingOpinion, setLoadingOpinion] = useState(false)

  async function handleSummary() {
    setLoadingSummary(true)
    const data = await getSummary(userId)
    setSummary(data)
    setLoadingSummary(false)
  }

  async function handleSymptoms() {
    setLoadingSymptoms(true)
    const data = await getSymptoms(userId)
    setSymptoms(data)
    setLoadingSymptoms(false)
  }

  async function handleSecondOpinion() {
    setLoadingOpinion(true)
    const data = await getSecondOpinion(userId)
    setSecondOpinion(data)
    setLoadingOpinion(false)
  }

  return (
    <div>
      <h2>Insights</h2>
      <p className="subtitle">Ask Dr. Aria to analyze your conversation so far.</p>

      <div className="insight-block">
        <div className="insight-header">
          <div>
            <h3>📝 Summary</h3>
            <p>A quick recap of what's been discussed.</p>
          </div>
          <button onClick={handleSummary} disabled={loadingSummary}>
            {loadingSummary ? 'Loading...' : summary ? 'Refresh' : 'Generate'}
          </button>
        </div>
        {loadingSummary && <Spinner />}
        {summary && (
          <div className="card">
            {summary.summary}
            <button onClick={() => setSummary(null)} className="bubble-delete" style={{ float: 'right' }}>×</button>
          </div>
        )}
      </div>

      <div className="insight-block">
        <div className="insight-header">
          <div>
            <h3>🩹 Symptoms</h3>
            <p>Every symptom you've mentioned, pulled into one list.</p>
          </div>
          <button onClick={handleSymptoms} disabled={loadingSymptoms}>
            {loadingSymptoms ? 'Loading...' : symptoms ? 'Refresh' : 'Generate'}
          </button>
        </div>
        {loadingSymptoms && <Spinner />}
        {symptoms && (
          <div className="card">
            {symptoms.symptoms_mentioned}
            <button onClick={() => setSymptoms(null)} className="bubble-delete" style={{ float: 'right' }}>×</button>
          </div>
        )}
      </div>

      <div className="insight-block">
        <div className="insight-header">
          <div>
            <h3>🔍 Second Opinion</h3>
            <p>A deeper look — possible conditions, lifestyle tips, and when to see a doctor urgently.</p>
          </div>
          <button onClick={handleSecondOpinion} disabled={loadingOpinion}>
            {loadingOpinion ? 'Loading...' : secondOpinion ? 'Refresh' : 'Generate'}
          </button>
        </div>
        {loadingOpinion && <Spinner />}
        {secondOpinion && (
          <div className="card">
            {secondOpinion.second_opinion}
            <button onClick={() => setSecondOpinion(null)} className="bubble-delete" style={{ float: 'right' }}>×</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Insights