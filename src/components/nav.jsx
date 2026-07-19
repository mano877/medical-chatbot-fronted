import { Link, useNavigate } from 'react-router-dom'
import { getToken, logout } from '../api/auth'

function Nav() {
  const navigate = useNavigate()
  const isLoggedIn = !!getToken()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <svg width="22" height="14" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,10 L25,10 L32,2 L40,18 L48,10 L100,10" fill="none" stroke="#0E6B5C" strokeWidth="4" strokeLinecap="round"/>
        </svg>
        🩺 Dr. Aria
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/chat">Chat</Link>
          <Link to="/history">History</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/documents">Documents</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</button>
        </>
      )}
    </nav>
  )
}

export default Nav