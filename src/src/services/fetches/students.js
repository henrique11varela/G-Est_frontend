import { api } from "src/boot/axios"
import { StudentIn, StudentOut } from "src/dto/StudentDTO"

export {
  get,
  post,
  getStudent,
  put,
  deleteStudent
}

async function get() {
  try {
    const { data } = await api.get('api/v1/students')
    const students = []
    for (const student of data.data) {
      students.push(new StudentIn(student))
    }
    return students
  } catch (error) {
    console.log(error);
  }
}

async function post(student) {
  try {
    const { data } = await api.post('api/v1/students', new StudentOut(student))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function getStudent(id) {
  try {
    const { data } = await api.get(`api/v1/students/${id}`)
    return new StudentIn(data)
  } catch (error) {
    console.log(error);
  }
}

async function put(id, student) {
  try {
    const { data } = await api.put(`api/v1/students/${id}`, new StudentOut(student))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function deleteStudent(id) {
  try {
    const { data } = await api.delete(`api/v1/students/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
