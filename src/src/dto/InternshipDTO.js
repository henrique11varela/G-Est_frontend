export default { input, output, rules }
// import StudentDTO from "./StudentDTO.js";
// import CompanyDTO from "./CompanyDTO.js";
// import CompanyPersonDTO from "./CompanyPersonDTO.js";

function input(data) {
  try {
    return {
      id: data.id,
      student: data.student,
      // student: StudentDTO.input(data.student),
      meal_allowance: data.meal_allowance,
      start_date: data.start_date,
      address: data.address,
      postcode: data.postcode,
      observations: data.observations,
      tutor: data.company_person,
      // tutor: CompanyPersonDTO.input(data.company_person),
      company: data.company,
      // company: CompanyDTO.input(data.company),
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


function output(data) {
  try {
    return {
      student_id: data.student_id,
      meal_allowance: data.meal_allowance,
      start_date: data.start_date,
      address: data.address,
      postcode: data.postcode,
      observations: data.observations,
      tutor_id: data.tutor_id,
      company_id: data.company_id,
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


function rules() {
  return {
    student_id: [val => val || 'Selecione um estudante'],
    meal_allowance: [val => val || 'Selecione uma opção'],
    start_date: [(val, rules) => rules.date(val) || 'Introduza uma data válida'],
    address: [val => val && val.length > 0 || 'Introduza uma morada'],
    postcode: [val => val && val.length > 0 || 'Introduza um codigo postal'],
    observations: [val => val && val.length > 0 || 'Introduza uma observação'],
    tutor_id: [val => val || 'Selecione um tutor'],
    company_id: [val => val || 'Selecione uma empresa'],
  }
}
