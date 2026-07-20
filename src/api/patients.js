import { authFetch } from './auth'

const BASE_URL = import.meta.env.VITE_API_URL

export async function getPatient(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}`)
  const data = await response.json()
  return data
}

export async function deleteAccount(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}