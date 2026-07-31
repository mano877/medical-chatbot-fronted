import { getToken } from './auth'

const BASE_URL = import.meta.env.VITE_API_URL

export async function sendMessage(userId, conversationId, message) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ conversation_id: conversationId, message }),
  })
  const data = await response.json()
  return data
}