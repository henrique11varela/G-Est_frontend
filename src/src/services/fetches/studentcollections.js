import { api } from "src/boot/axios"
import { ClassIn, ClassOut } from "src/dto/ClassDTO"
import { PaginationDTO } from "src/dto/PaginationDTO"

export {
  get,
  post,
  getClass,
  put,
  deleteClass
}

async function get(page=1, quantity=15, name) {
  try {
    const { data } = await api.get(`api/v1/studentcollections?page=${page}&quantity=${quantity}&name=${name}`)
    const studentClasses = []
    for (const studentClass of data.data) {
      studentClasses.push(new ClassIn(studentClass))
    }
    return {
      "Data": studentClasses,
      "Pagination": new PaginationDTO(data.total, data.current_page, data.per_page)
    }
  } catch (error) {
    console.log(error);
  }
}

async function post(studentClass) {
  try {
    const { data } = await api.post('api/v1/studentcollections', new ClassOut(studentClass))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function getClass(id) {
  try {
    const { data } = await api.get(`api/v1/studentcollections/${id}`)
    return new ClassIn(data)
  } catch (error) {
    console.log(error);
  }
}

async function put(id, studentClass) {
  try {
    const { data } = await api.put(`api/v1/studentcollections/${id}`, new ClassOut(studentClass))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function deleteClass(id) {
  try {
    const { data } = await api.delete(`api/v1/studentcollections/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
