import { api } from "src/boot/axios"
import { UserDTO } from "src/dto/UserDTO"
import { PaginationDTO } from "src/dto/PaginationDTO.js"
export {
  get,
  post,
  put,
  getUser,
  deleteUser
}
async function get(
  page = 1,
  filter = {
    name: "",
    email: "",
  },
  quantity = 15
) {
  try {
    const { data } = await api.get(`/api/v1/users?page=${page}&name=${filter.name}&email=${filter.email}&quantity=${quantity}`)
    const users = []
    for (const user of data.data) {
      users.push(new UserDTO(user));
    }
    return {
      "Data": users,
      "Pagination": new PaginationDTO(data.from, data.last_page, data.total, data.current_page, data.per_page)
    }
  } catch (error) {
    console.log(error);
  }
}
async function getUser(id) {
  const { data } = await api.get('/api/v1/users/' + id)
  const company = new UserDTO(data);
  return company
}
async function post(name, email, password) {
  try {
    const payload = {
      "name": name,
      "email": email,
      "password": password,
    }
    const { data } = await api.post('api/v1/users', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}
async function getCompany(id) {
  const { data } = await api.get('/api/v1/companies/' + id)
  const company = new UserDTO(data);
  return company
}

async function put(id, user) {
  try {
    const payload = user
    const { data } = await api.put('api/v1/users/' + id, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(id) {
  try {
    const { data } = await api.delete('api/v1/users/' + id)
    return data
  } catch (error) {
    console.log(error);
  }
}
