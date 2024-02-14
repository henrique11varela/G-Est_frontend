import { api } from "src/boot/axios"
import { useLoginStore } from "../../stores/login.js";
import Router from "../../router";
import paginationDTO from "src/dto/PaginationDTO.js";
import applicationDTO from "src/dto/ApplicationDTO.js";

export default {
  index,
  store,
  show,
  update,
  destroy
}

async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/applications', {params: params})
    const applications = []
    for(const application of data.data) {
      applications.push(applicationDTO.input(application))
    }
    return {
      data: applications,
      pagination: paginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
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
    return applicationDTO.input(data)
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
