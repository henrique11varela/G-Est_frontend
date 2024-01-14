import { api } from "src/boot/axios"
import { ClassIn, ClassOut } from "src/dto/ClassDTO"

export {
  get,
  post,
  getClass,
  put,
  deleteClass
}

async function get() {
  try {
    const { data } = await api.get('api/v1/studentcollections')
    const studentClasses = []
    for (const studentClass of data.data) {
      studentClasses.push(new ClassIn(studentClass))
    }
    return studentClasses
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
