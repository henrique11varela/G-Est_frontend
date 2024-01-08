import { api } from "src/boot/axios"

export default {
  get,
  login,
}

async function get() {
  try {
    const { data } = await api.get('sanctum/csrf-cookie')
    return data
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}
