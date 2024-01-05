import { api } from "src/boot/axios"

export default {
  index,
  store
}

async function index() {
  try {
    const { data } = await api.get('api/v1/applications')
    return data
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/applications', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}
