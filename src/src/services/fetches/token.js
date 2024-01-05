import { api } from "src/boot/axios"

export default {
  get,
}

async function get() {
  try {
    const { data } = await api.get('sanctum/csrf-cookie')
    return data
  } catch (error) {
    console.log(error);
  }
}

