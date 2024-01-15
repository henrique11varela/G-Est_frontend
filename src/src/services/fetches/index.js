import { api } from "src/boot/axios";
import paginationDTO from "src/dto/PaginationDTO";


async function index(params = null) {
  try {
    const { data } = await api.get('api/v1/studentcollections', params);
    const studentClasses = [];
    for (const studentClass of data.data) {
      studentClasses.push(new ClassIn(studentClass));
    }
    const paginationData = { ...data.total, ...data.current_page, data, : .per_page };
    return {
      data: studentClasses,
      pagination: new paginationDTO(data.total, data.current_page, data.per_page)
    };
  } catch (error) {
    console.log(error);
  }
}
