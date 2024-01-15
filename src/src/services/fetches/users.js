import { api } from "src/boot/axios"
import { UserDTO } from "src/dto/UserDTO"
import { PaginationDTO } from "src/dto/PaginationDTO.js"
export {
  get,
  post,
  put
}
async function get(page = 1) {
  try {
    const { data } = await api.get('/api/v1/users?page=' + page)
    const users = []
    for (const user of data.data) {
      users.push(new UserDTO(user));
    }
    return {
      "Data": users,
      "Pagination": new PaginationDTO(data.total, data.current_page, data.per_page)
    }
  } catch (error) {
    console.log(error);
  }
}
async function getUser(id) {
  try {
    const { data } = await api.get('/api/v1/users/' + id)
    const company = new CompanyDTO(data);
    return company
  } catch (error) {
    console.log(error);
  }
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

async function put(id, user) {
  try {
    const payload = user
    const { data } = await api.put('api/v1/users/' + id, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}
