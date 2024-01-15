import { api } from "src/boot/axios"
import { CourseIn, CourseOut } from "src/dto/CourseDTO"

export {
  get,
  post,
  getCourse,
  put,
  deleteCourse
}

async function get() {
  try {
    const { data } = await api.get('api/v1/courses')
    const courses = []
    for (const course of data.data) {
      courses.push(new CourseIn(course))
    }
    return courses
  } catch (error) {
    console.log(error);
  }
}

async function post(course) {
  try {
    const { data } = await api.post('api/v1/courses', new CourseOut(course))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function getCourse(id) {
  try {
    const { data } = await api.get(`api/v1/courses/${id}`)
    return new CourseIn(data)
  } catch (error) {
    console.log(error);
  }
}

async function put(id, course) {
  try {
    const { data } = await api.put(`api/v1/courses/${id}`, new CourseOut(course))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function deleteCourse(id) {
  try {
    const { data } = await api.delete(`api/v1/courses/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
