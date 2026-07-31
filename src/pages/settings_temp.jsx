import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPatient, deleteAccount } from '../api/patients'
import { getUserId, logout } from '../api/auth'

function Settings() {
  const userId = getUserId()
  const [patient, setPatient] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getPatient(userId).then((data) => setPatient(data))
  }, [userId])

  async function handleDeleteAccount() {
    await deleteAccount(userId)
    logout()
    navigate('/')
  }

  return (
    <div>
      <h2>Settings</h2>

      {patient && (
        <div className="card">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Age:</strong> {patient.age}</p>
        </div>
      )}

      <div className="insight-block" style={{ borderColor: 'var(--danger)' }}>
        <h3 style={{ color: 'var(--danger)' }}>Danger Zone</h3>
        <p>Deleting your account permanently removes your profile, every conversation, and every uploaded document. This cannot be undone.</p>

        {!confirming ? (
          <button className="danger" onClick={() => setConfirming(true)}>Delete Account</button>
        ) : (
          <div>
            <p><strong>Are you sure?</strong></p>
            <button className="danger" onClick={handleDeleteAccount}>Yes, delete everything</button>
            {' '}
            <button onClick={() => setConfirming(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings