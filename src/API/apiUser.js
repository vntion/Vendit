/**
 * Register
 */
export async function register (name, email, password) {
  const newUser = { name, email, password }
  const res = await fetch('https://forum-api.dicoding.dev/v1/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  if (!res.ok) throw Error(data.message)

  return data.data.user
}

/**
 * Login
 */
export async function login (email, password) {
  const user = { email, password }
  const res = await fetch('https://forum-api.dicoding.dev/v1/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message)

  return data.data.token
}

/**
 * Get all users
 */
export async function getAllUsers () {
  const res = await fetch('https://forum-api.dicoding.dev/v1/users')

  if (!res.ok) throw Error()

  const {
    data: { users }
  } = await res.json()

  return users
}

/**
 * Get user profile
 */
export async function getUserProfile (token) {
  const res = await fetch('https://forum-api.dicoding.dev/v1/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message)

  return data.data.user
}
