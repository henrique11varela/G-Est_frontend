import { api } from "src/boot/axios"
import coordinatorDTO from "src/dto/CoordinatorDTO"
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
    const { data } = await api.get('api/v1/coordinators', { params: params })
    const coordinators = []
    for (const coordinator of data.data) {
      coordinators.push(coordinatorDTO.input(coordinator))
    }
    return {
      data: coordinators,
      pagination: paginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/coordinators', coordinatorDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/coordinators/${id}`)
    return coordinatorDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/coordinators/${payload.id}`, coordinatorDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete(`api/v1/coordinators/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}