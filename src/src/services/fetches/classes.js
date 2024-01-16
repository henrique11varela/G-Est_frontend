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
      pagination: paginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/studentcollections', new classDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/studentcollections/${id}`)
    return new classDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    console.log(payload)
    const out = new classDTO.output(payload)
    console.log(out)
    const { data } = await api.put(`api/v1/studentcollections/${payload.id}`, out)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete(`api/v1/studentcollections/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
