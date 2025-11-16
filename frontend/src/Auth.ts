const AUTH_TOKEN_KEY = "token";
const AUTH_USERNAME_KEY = "username";

export function saveAuth(username: string, token: string) {
  localStorage.setItem(AUTH_USERNAME_KEY, username);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuth() {
  localStorage.removeItem(AUTH_USERNAME_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAuth() {
  const username = localStorage.getItem(AUTH_USERNAME_KEY);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return { username, token };
}

export function isAuthenticated() {
  const { username, token } = getAuth();
  return Boolean(username && token);
}
