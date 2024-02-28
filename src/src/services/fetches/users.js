import { api } from "src/boot/axios"
import UserDTO from "src/dto/UserDTO"
import PaginationDTO from "src/dto/PaginationDTO.js"
export default {
  index,
  store,
  show,
  update,
  destroy
}
async function index(
  filter = {
    name: "",
    email: "",
    quantity: 15,
    page: 1,
  },
) {
  try {
    const { data } = await api.get(`/api/v1/users`, filter)
    const users = []
    for (const user of data.data) {
      users.push(new UserDTO.input(user));
    }
    return {
      data: users,
      pagination: new PaginationDTO.input(data),
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
    const { data } = await api.get('/api/v1/users/' + id)
    return {
      ...UserDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}
async function store(payload) {
  try {
    const { data } = await api.post('api/v1/users', payload)
    return {
      ...UserDTO.input(data),
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
    const { data } = await api.put('api/v1/users/' + payload.id, payload)
    return {
      ...UserDTO.input(data),
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
    const { data } = await api.delete('api/v1/users/' + id)
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
