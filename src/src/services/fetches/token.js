import { api } from "src/boot/axios"

export default {
  get,
  login,
  logout,
  checkRole,
}

async function get() {
  try {
    const { data } = await api.get('sanctum/csrf-cookie')
    return data
  } catch (error) {
  }
}

async function login(email, password) {
  try {
    const payload = {
      "email": email,
      "password": password,
    }
    const { data } = await api.post('api/v1/login', payload)
    return data
  } catch (error) {
  }
}

async function logout() {
  try {
    const { data } = await api.post('api/v1/logout')
    return data
  } catch (error) {
  }
}

async function checkRole() {
  try {
    const { data } = await api.get('api/v1/checkrole')
    return data
  } catch (error) {
    return {}
  }
}
