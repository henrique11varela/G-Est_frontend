import { api } from "src/boot/axios"
import AreaDTO from "src/dto/AreaDTO"
import PaginationDTO from "src/dto/PaginationDTO"

export default {
  index,
  store,
  show,
  destroy
}

async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/areas', { params })
    const areas = []
    for (const area of data.data) {
      areas.push(AreaDTO.input(area))
    }
    return {
      data: areas,
      pagination: PaginationDTO.input(data),
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
    const { data } = await api.post('api/v1/areas', payload)
    return {
      ...AreaDTO.input(data),
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
    const { data } = await api.get(`api/v1/areas/${id}`)
    return {
      ...AreaDTO.input(data),
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
    const { data } = await api.put(`api/v1/areas/${payload.id}`, payload)
    return {
      ...AreaDTO.input(data),
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
    const { data } = await api.delete(`api/v1/areas/${id}`)
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
