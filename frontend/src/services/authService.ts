import axios from 'axios'

export function login(email: string, password: string) {
  return axios.post("https://localhost:7164/api/auth/login", { email, password });
}