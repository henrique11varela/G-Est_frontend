import { api } from "src/boot/axios"
import classDTO from "src/dto/ClassDTO"
import paginationDTO from "src/dto/PaginationDTO"

export default {
  index,
  store,
  show,
  update,
  destroy
}

async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/studentcollections', { params: params })
    const studentClasses = []
    for (const studentClass of data.data) {
      studentClasses.push(classDTO.input(studentClass))
    }
    return {
      data: studentClasses,
      pagination: paginationDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/studentcollections', classDTO.output(payload))
    return {
      ...classDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/studentcollections/${id}`)
    return {
      ...classDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/studentcollections/${payload.id}`, classDTO.output(payload))
    return {
      ...classDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete(`api/v1/studentcollections/${id}`)
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}
