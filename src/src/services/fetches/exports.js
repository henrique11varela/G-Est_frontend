import { api } from "src/boot/axios"

export default {
  studentClass
}

async function studentClass(id) {
  try {
    const { data } = await api.get(`api/v1/export/studentcollection/${id}`, {
      responseType: 'blob'
    })
    return {
      blob: data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}
