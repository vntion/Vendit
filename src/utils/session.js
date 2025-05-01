export function createSession (token) {
  window.localStorage.setItem('__t', token)
}

export function deleteSession () {
  window.localStorage.removeItem('__t')
}

export function getSession () {
  return window.localStorage.getItem('__t')
}
