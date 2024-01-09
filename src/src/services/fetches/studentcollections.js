import { api } from "src/boot/axios"
import { useLoginStore } from "../../stores/login.js";

export default {
  index,
  store,
  show,
  destroy
}

async function index() {
  try {
    const { data } = await api.get('api/v1/studentcollections')
    return data
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/studentcollections', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/studentcollections/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/studentcollections/${payload.id}`, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/studentcollections/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
