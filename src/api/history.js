import { authFetch } from './auth'

const BASE_URL = 'http://localhost:8000'

export async function getHistory(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}/history`)
  const data = await response.json()
  return data
}

export async function delHistory(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}/history`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}

export async function deleteMessage(messageId) {
  const response = await authFetch(`${BASE_URL}/messages/${messageId}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}