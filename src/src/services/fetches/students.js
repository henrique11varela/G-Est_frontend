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
      students.push(new studentDTO.input(student))
    }
    return {
      data: students,
      pagination: paginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/students', new studentDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/students/${id}`)
    return new studentDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/students/${payload.id}`, new studentDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete(`api/v1/students/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
