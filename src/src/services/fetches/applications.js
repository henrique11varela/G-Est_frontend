import { api } from "src/boot/axios"
import { useLoginStore } from "../../stores/login.js";
import Router from "../../router";

export default {
  index,
  store,
  show,
  destroy
}

async function index() {
  try {
    const { data } = await api.get('api/v1/applications')
    return data
  } catch (error) {
    console.log(Router);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/applications', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/applications/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/applications/${payload.id}`, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/applications/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
