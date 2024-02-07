import { api } from "src/boot/axios"
import CompanyDTO from "src/dto/CompanyDTO.js"
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
    const { data } = await api.get(`/api/v1/companies`, { params })
    const companies = []
    for (const company of data.data) {
      companies.push(CompanyDTO.input(company));
    }
    return {
      data: companies,
      pagination: PaginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`/api/v1/companies/${id}`)
    const company = CompanyDTO.input(data);
    return {
      ...company,
    }
  } catch (e) {
    console.log(e)
  }
}

async function store(company) {
  try {
    const payload = company
    const { data } = await api.post('api/v1/companies', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}

async function update(company) {
  try {
    const payload = CompanyDTO.output(company)
    const { data } = await api.put('api/v1/companies/' + payload.id, payload);

    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delete('api/v1/companies/' + id)
    return data
  } catch (error) {
    console.log(error);
  }
}
