const axios = require('axios').default;
const API_URL = 'http://localhost:4000';

export async function register(username: string, password: string) {
  const response = await axios.post(`${API_URL}/signup`, { username, password });
  return response.data;
}

export async function login(username: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('user', JSON.stringify({ username }));
  return response.data;
}

export async function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') as string);
}

export async function isAuthenticated() {
  return !!JSON.parse(localStorage.getItem('user') as string);
}
