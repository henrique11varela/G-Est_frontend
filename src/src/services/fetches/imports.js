import { api } from "src/boot/axios"

export default {
  classes
}

async function classes(payload) {
  try {
    const { data } = await api.post('api/v1/import/studentcollections', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    console.log(error);
  }
}
