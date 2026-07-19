import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'
import History from './pages/History'
import Insights from './pages/Insights'
import Documents from './pages/Documents'
import ProtectedRoute from './components/ProtectedRoute'
import { getToken, logout } from './api/auth'
import { useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App