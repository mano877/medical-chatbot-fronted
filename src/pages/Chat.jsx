import { useState, useEffect } from 'react'
import { sendMessage } from '../api/chat'
import { getPatient } from '../api/patients'
import { createConversation, listConversations, getConversationMessages, deleteConversation } from '../api/conversations'
import { getUserId } from '../api/auth'
import Spinner from '../components/Spinner'
import { deleteMessage } from '../api/history'

function Chat() {
  const userId = getUserId()
  const [patient, setPatient] = useState(null)
  const [conversations, setConversations] = useState([])
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPatient(userId).then((data) => setPatient(data))
    loadConversations()
  }, [userId])

  async function loadConversations() {
    const list = await listConversations()
    setConversations(list)
    if (list.length > 0 && !activeConversationId) {
      openConversation(list[0].id)
    }
  }

  async function openConversation(conversationId) {
    setActiveConversationId(conversationId)
    const msgs = await getConversationMessages(conversationId)
    setMessages(msgs)
  }

  async function handleNewChat() {
    const conversation = await createConversation()
    setConversations((prev) => [conversation, ...prev])
    setActiveConversationId(conversation.id)
    setMessages([])
  }

  async function handleSend(event) {
    event.preventDefault()
    if (!input.trim() || !activeConversationId) return

    const userMessage = { role: 'human', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    const data = await sendMessage(userId, activeConversationId, input)
    const aiMessage = { role: 'ai', content: data.response }
    setMessages((prev) => [...prev, aiMessage])
    setLoading(false)
  }

  async function handleDeleteConversation(event, conversationId) {
  event.stopPropagation()
  await deleteConversation(conversationId)
  setConversations((prev) => prev.filter((c) => c.id !== conversationId))
  if (conversationId === activeConversationId) {
    setActiveConversationId(null)
    setMessages([])
  }
}

  async function handleDeleteMessage(messageId) {
  await deleteMessage(messageId)
  setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
}

  return (
    <div className="chat-layout">
      <aside className="conversation-sidebar">
        <button onClick={handleNewChat} className="new-chat-btn">+ New Chat</button>
        <div className="conversation-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conversation-item ${c.id === activeConversationId ? 'active' : ''}`}
              onClick={() => openConversation(c.id)}
            >
              <span>{new Date(c.created_at).toLocaleDateString()}</span>
              <button onClick={(e) => handleDeleteConversation(e, c.id)} className="conversation-delete">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>

      <div className="chat-page">
        <h2>🩺 Chat with Dr. Aria {patient ? `(${patient.name})` : ''}</h2>

        <div className="chat-log">
          {loading && <div className="bubble ai"><Spinner /></div>}
          {[...messages].reverse().map((msg, index) => (
            <div key={msg.id || index} className={`bubble ${msg.role === 'human' ? 'human' : 'ai'}`}>
              {msg.content}
              {msg.id && (
                <button onClick={() => handleDeleteMessage(msg.id)} className="bubble-delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
          )}
       </div>
        ))}
      </div>

        <form onSubmit={handleSend} className="chat-input-row">
          <input
            type="text"
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}


export default Chat