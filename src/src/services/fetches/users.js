import { api } from "src/boot/axios"
import UserDTO from "src/dto/UserDTO"
import PaginationDTO from "src/dto/PaginationDTO.js"
export default {
  index,
  create,
  update,
  show,
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
      "Data": users,
      "Pagination": new PaginationDTO.input(data)
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
async function create(payload) {
  try {
    const { data } = await api.post('api/v1/users', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put('api/v1/users/' + payload.id, payload)
    return data
  } catch (error) {
    console.log(error);
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
