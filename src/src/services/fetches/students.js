import { api } from "src/boot/axios"
import studentDTO from "src/dto/StudentDTO"
import paginationDTO from "src/dto/PaginationDTO"

export default {
  index,
  store,
  show,
  update,
  destroy
}

async function index(params) {
  try {
    const { data } = await api.get('api/v1/students', { params: params })
    const students = []
    for (const student of data.data) {
      students.push(studentDTO.input(student))
    }
    return {
      data: students,
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
    const { data } = await api.post('api/v1/students', studentDTO.output(payload))
    return {
      ...studentDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/students/${id}`)
    return {
      ...studentDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/students/${payload.id}`, studentDTO.output(payload))
    return {
      ...studentDTO.input(data),
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
    const { data } = await api.delete(`api/v1/students/${id}`)
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
