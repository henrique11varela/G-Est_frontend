import { api } from "src/boot/axios"
import courseDTO from "src/dto/CourseDTO"

export default {
  index,
  store,
  show,
  update,
  destroy
}

async function index() {
  try {
    const { data } = await api.get('api/v1/courses')
    const courses = []
    for (const course of data.data) {
      courses.push(new courseDTO.input(course))
    }
    return courses
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/courses', new courseDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/courses/${id}`)
    return new courseDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/courses/${payload.id}`, new courseDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete(`api/v1/courses/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
