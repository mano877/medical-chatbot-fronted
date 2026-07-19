const BASE_URL = 'http://localhost:8000'

export async function signup(userData) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Signup failed')
  }
  return response.json()
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Login failed')
  }
  return response.json()
}

export function saveSession(token, userId) {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getUserId() {
  return localStorage.getItem('userId')
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}

export async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${getToken()}`,
    },
  })
  if (response.status === 401) {
    logout()
    window.location.href = '/login'
    throw new Error('Session expired. Please log in again.')
  }
  return response
}