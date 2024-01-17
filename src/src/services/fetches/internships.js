import { api } from "src/boot/axios"
import InternshipDTO from "../../dto/InternshipDTO.js";
import PaginationDTO from "../../dto/PaginationDTO.js";

export default {
  index,
  store,
  show,
  destroy
}

async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/internships', { params: params })
    const internships = []
    data.data.forEach(internship => {
      internships.push(InternshipDTO.input(internship))
    });
    return {
      data: internships,
      pagination: PaginationDTO.input(data)
    }
  } catch (error) {
    console.log(error);
  }
}

async function store(payload) {
  try {
    const { data } = await api.post('api/v1/internships', InternshipDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function show(id) {
  try {
    const { data } = await api.get(`api/v1/internships/${id}`)
    return InternshipDTO.input(data)
  } catch (error) {
    console.log(error);
  }
}

async function update(payload) {
  try {
    const { data } = await api.put(`api/v1/internships/${payload.id}`, InternshipDTO.output(payload))
    return data
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const { data } = await api.delee(`api/v1/internships/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
