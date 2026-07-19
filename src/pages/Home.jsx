import { Link } from 'react-router-dom'
import { getToken } from '../api/auth'

function Home() {
  const isLoggedIn = !!getToken()

  return (
    <div className="page home">
      <div className="hero-row">

        {/* Left: heartbeat pulse */}
        <svg className="hero-pulse" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 L60,40 L80,10 L100,70 L120,40 L200,40"
                fill="none" stroke="#0E6B5C" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
        </svg>

        {/* Center: hero text */}
        <div className="hero-text">
          <h1>🩺 Dr. Aria</h1>
          <p className="subtitle">Your personal AI health companion — ask questions, track symptoms, and keep your medical conversations in one place.</p>
          {isLoggedIn ? (
            <Link to="/chat" className="cta-button">Go to Chat</Link>
          ) : (
            <>
              <Link to="/signup" className="cta-button">Sign Up</Link>
              {' '}
              <Link to="/login" className="cta-button">Log In</Link>
            </>
          )}
        </div>

        {/* Right: doctor with stethoscope + patient folder */}
        <svg className="hero-doctor" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
          {/* head */}
          <circle cx="100" cy="50" r="28" fill="#F1C9A5"/>
          {/* hair */}
          <path d="M72,45 Q75,18 100,18 Q125,18 128,45 Q126,30 100,28 Q74,30 72,45" fill="#3B2F2F"/>
          {/* body / white coat */}
          <path d="M55,255 L55,140 Q55,95 100,90 Q145,95 145,140 L145,255 Z" fill="#FFFFFF" stroke="#DCE7E4" strokeWidth="2"/>
          {/* shirt under coat */}
          <path d="M85,92 L100,120 L115,92 Q100,86 85,92" fill="#0E6B5C"/>
          {/* coat lapels */}
          <path d="M85,92 L100,120 L88,150 L78,100 Z" fill="#F5F8F7"/>
          <path d="M115,92 L100,120 L112,150 L122,100 Z" fill="#F5F8F7"/>
          {/* stethoscope */}
          <path d="M85,95 Q80,130 95,150" fill="none" stroke="#094A40" strokeWidth="4" strokeLinecap="round"/>
          <path d="M115,95 Q120,130 105,150" fill="none" stroke="#094A40" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="100" cy="156" r="8" fill="#094A40"/>
          <circle cx="100" cy="156" r="4" fill="#E3A23C"/>
          {/* left arm holding folder */}
          <path d="M55,145 Q35,165 45,195" fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
          {/* patient folder */}
          <rect x="28" y="185" width="52" height="38" rx="4" fill="#E3A23C"/>
          <rect x="28" y="185" width="52" height="10" rx="4" fill="#C88A2B"/>
          <line x1="36" y1="205" x2="72" y2="205" stroke="#FFFFFF" strokeWidth="2"/>
          <line x1="36" y1="213" x2="64" y2="213" stroke="#FFFFFF" strokeWidth="2"/>
          {/* right arm */}
          <path d="M145,145 Q160,170 152,200" fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
        </svg>

      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Chat Anytime</h3>
          <p>Talk through symptoms and questions whenever you need to.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Track History</h3>
          <p>Every conversation is saved, so nothing gets lost.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Get Insights</h3>
          <p>Summaries, symptom lists, and a second opinion on demand.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3>Upload Records</h3>
          <p>Share lab reports or prescriptions for more informed answers.</p>
        </div>
      </div>
    </div>
  )
}

export default Home