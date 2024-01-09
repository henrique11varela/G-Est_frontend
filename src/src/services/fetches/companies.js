import { api } from "src/boot/axios"
import { CompanyDTO } from "src/dto/CompanyDTO.js"
import { PaginationDTO } from "src/dto/PaginationDTO.js"
export {
  get,
  post,
  put,
  getCompany,
  deleteCompany
}
async function get(page = 1) {
  try {
    const { data } = await api.get('/api/v1/companies?page=' + page)
    const companies = []
    for (const company of data.data) {
      companies.push(new CompanyDTO(company));
    }
    return {
      "Data": companies,
      "Pagination": new PaginationDTO(data.from, data.last_page, data.total, data.current_page, data.per_page)
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCompany(id) {
  try {
    const { data } = await api.get('/api/v1/companies/' + id)
    const company = new CompanyDTO(data);
    return company
  } catch (error) {
    console.log(error);
  }
}
async function post(company) {
  try {
    const payload = company
    const { data } = await api.post('api/v1/companies', payload)
    return data
  } catch (error) {
    console.log(error);
  }
}
async function put(id, company) {
  try {
    const payload = company
    const { data } = await api.put('api/v1/companies/' + id, payload)
    return data
  } catch (error) {
    console.log(error);
  }
}


async function deleteCompany(id) {
  try {
    const { data } = await api.delete('api/v1/companies/' + id)
    return data
  } catch (error) {
    console.log(error);
  }
}
