import { authFetch } from './auth'

const BASE_URL = 'http://localhost:8000'

export async function createConversation() {
  const response = await authFetch(`${BASE_URL}/conversations`, {
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export async function listConversations() {
  const response = await authFetch(`${BASE_URL}/conversations`)
  const data = await response.json()
  return data
}

export async function getConversationMessages(conversationId) {
  const response = await authFetch(`${BASE_URL}/conversations/${conversationId}/messages`)
  const data = await response.json()
  return data
}

export async function deleteConversation(conversationId) {
  const response = await authFetch(`${BASE_URL}/conversations/${conversationId}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}