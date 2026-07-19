import { authFetch } from './auth'

const BASE_URL = 'http://localhost:8000'

export async function getSummary(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}/summarize`, {
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export async function getSymptoms(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}/symptoms`)
  const data = await response.json()
  return data
}

export async function getSecondOpinion(userId) {
  const response = await authFetch(`${BASE_URL}/users/${userId}/second-opinion`, {
    method: 'POST',
  })
  const data = await response.json()
  return data
}