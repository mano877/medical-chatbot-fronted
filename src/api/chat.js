import { getToken } from './auth'

const BASE_URL = import.meta.env.VITE_API_URL

export async function sendMessage(userId, conversation_Id, message) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
     body: JSON.stringify({ user_id: Number(userId), conversation_id: conversationId, message }),
  })
  const data = await response.json()
  return data
}