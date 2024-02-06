import { api } from "src/boot/axios"
import AreaDTO from "src/dto/AreaDTO"

export default {
  index,
  store,
  show,
  destroy
}

async function index() {
  try {
    const { data } = await api.get('api/v1/areas')
    const areas = []
    for (const area of data) {
      areas.push(AreaDTO.input(area))
    }
    return areas
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/areas', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/areas/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/areas/${payload.id}`, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/areas/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
