import { useState, useEffect } from 'react'
import { getHistory, delHistory, deleteMessage } from '../api/history'
import { getUserId } from '../api/auth'

function History() {
  const userId = getUserId()
  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory(userId).then((data) => setHistory(data.messages))
  }, [userId])

  async function handleClear() {
    await delHistory(userId)
    setHistory([])
  }


  async function handleDeleteMessage(messageId) {
    await deleteMessage(messageId)
    setHistory((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  return (
    <div className="chat-page">
      <h2>History</h2>
      <button onClick={handleClear} style={{ marginBottom: '16px' }}>Clear History</button>

      <div className="chat-log">
        {[...history].reverse().map((msg) => (
          <div key={msg.id} className={`bubble ${msg.role === 'human' ? 'human' : 'ai'}`}>
            {msg.content}
            <button onClick={() => handleDeleteMessage(msg.id)} className="bubble-delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History