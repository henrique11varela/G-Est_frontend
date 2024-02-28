import { api } from "src/boot/axios"

export default {
  classes,
  companies
}

async function classes(payload) {
  return await importFile('api/v1/import/studentcollections', payload)
}

async function companies(payload) {
  return await importFile('api/v1/import/companies', payload)
}

async function importFile(url, payload ) {
  try {
    const { data } = await api.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}
