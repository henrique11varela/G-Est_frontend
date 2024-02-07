import { api } from "src/boot/axios"
import { useLoginStore } from "../../stores/login.js";
import companyAddressesDTO from "src/dto/CompanyAddressDTO.js"
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
    const { data } = await api.get('api/v1/companyaddresses', { params })
    const peoples = []
    for (const company of data.data) {
      peoples.push(companyAddressesDTO.input(company));
    }
    return {
      data: peoples,
      pagination: PaginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    payload = companyAddressesDTO.output(payload)
    const { data } = await api.post('api/v1/companyaddresses', payload)
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      status: 500,
      errors: error.response.data.errors
    }
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/companyaddresses/${id}`)
    return companyAddressesDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    payload = companyAddressesDTO.output(payload)
    const { data } = await api.put(`api/v1/companyaddresses/${payload.id}`, payload)
    return {
      ...data,
      requestStatus: 200
    }
  } catch (error) {
    return {
      status: error.response.status,
      errors: error.response.data.errors
    }
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/companyaddresses/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
