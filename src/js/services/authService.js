import { apiPost, getAuthToken } from './api.js';

const TOKEN_KEY = 'dicoding_token';
const USER_KEY = 'dicoding_user';
export const AUTH_EVENT = 'auth-changed';

function emitAuthChange(detail = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail }));
  }
}

function persistAuth(loginResult) {
  if (!loginResult?.token) return;
  localStorage.setItem(TOKEN_KEY, loginResult.token);
  localStorage.setItem(USER_KEY, JSON.stringify(loginResult));
  emitAuthChange({ authenticated: true });
}

export async function register({ name, email, password }) {
  return apiPost('/register', { name, email, password });
}

export async function login({ email, password }) {
  const res = await apiPost('/login', { email, password });
  persistAuth(res.loginResult);
  return res;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emitAuthChange({ authenticated: false });
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function onAuthChange(callback) {
  if (typeof window === 'undefined' || typeof callback !== 'function') return () => {};
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}
