const AUTH_TOKEN_KEY = "token";
const AUTH_USERNAME_KEY = "username";
const AUTH_IS_ADMIN = "is_admin";

export function saveAuth(username: string, token: string, is_admin: Boolean) {
  localStorage.setItem(AUTH_USERNAME_KEY, username);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_IS_ADMIN, is_admin);
}

export function clearAuth() {
  localStorage.removeItem(AUTH_USERNAME_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_IS_ADMIN);
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

export function isAdmin(){
  const is_admin = localStorage.getItem(AUTH_IS_ADMIN);
  return is_admin;
}
