import { authFetch } from './auth'

const BASE_URL = import.meta.env.VITE_API_URL

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await authFetch(`${BASE_URL}/documents/upload`, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data
}

export async function getDocuments() {
  const response = await authFetch(`${BASE_URL}/documents`)
  const data = await response.json()
  return data
}

export async function deleteDocument(docId) {
  const response = await authFetch(`${BASE_URL}/documents/${docId}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}