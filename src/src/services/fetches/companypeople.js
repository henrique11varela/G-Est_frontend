import { api } from "src/boot/axios"
import { useLoginStore } from "../../stores/login.js";
import CompanyPeopleDTO from "src/dto/CompanyPeopleDTO.js"
import PaginationDTO from "src/dto/PaginationDTO.js"

export default {
  index,
  store,
  show,
  destroy,
  update
}

async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/companypeople', { params })
    const peoples = []
    for (const company of data.data) {
      peoples.push(CompanyPeopleDTO.input(company));
    }
    return {
      data: peoples,
      pagination: PaginationDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/companypeople', CompanyPeopleDTO.output(payload))
    return {
      ...CompanyPeopleDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/companypeople/${id}`)
    return {
      ...CompanyPeopleDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/companypeople/${payload.id}`, CompanyPeopleDTO.output(payload))
    return {
      ...CompanyPeopleDTO.input(data),
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/companypeople/${id}`)
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      requestStatus: error.response.status,
      errors: error.response.data.errors,
    }
  }
}
