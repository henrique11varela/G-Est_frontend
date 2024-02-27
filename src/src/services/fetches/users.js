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
async function index(params = null) {
  try {
    const { data } = await api.get(`/api/v1/users`, { params })
    const users = []
    for (const user of data.data) {
      users.push(new UserDTO.input(user));
    }
    return {
      data: users,
      pagination: new PaginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}
async function show(id) {
  const { data } = await api.get('/api/v1/users/' + id)
  const company = new UserDTO.input(data);
  return company
}
async function store(payload) {
  try {
    const { data } = await api.post('api/v1/users', payload)
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

async function update(payload) {
  try {
    const { data } = await api.put('api/v1/users/' + payload.id, payload)
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: 500,
      errors: error.response.data.errors
    }
  }
}
async function destroy(id) {
  try {
    const { data } = await api.delete('api/v1/users/' + id)
    return data
  } catch (error) {
    console.log(error);
  }
}
