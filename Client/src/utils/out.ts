import { User } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export function getAccessTokenFromLS() {
  return localStorage.getItem('access_token') || ''
}

export function getRefreshTokenFromLS() {
  return localStorage.getItem('refresh_token') || ''
}

export function setAccessTokenToLS(access_token: string) {
  localStorage.setItem('access_token', access_token)
}

export function setRefreshTokenToLS(refresh_token: string) {
  localStorage.setItem('refresh_token', refresh_token)
}

export function clearLS() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
