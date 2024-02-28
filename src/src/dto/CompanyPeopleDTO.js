export default {
  input,
  output,
  rules
}
function input(data) {
  return {
    id: data.id,
    companyId: data.company_id,
    isContact: data.is_contact == 1 ? true : false,
    isTutor: data.is_tutor == 1 ? true : false,
    name: data.name,
    email: data.email,
    phoneNumber: data.phone_number,
  }
}
function output(data) {
  return {
    id: data.id,
    company_id: data.companyId,
    is_contact: data.isContact,
    is_tutor: data.isTutor,
    name: data.name,
    email: data.email,
    phone_number: data.phoneNumber,
  }
}
function rules() {
  return {
    name: [
      val => val && val.length > 0 || "Introduza um Nome",
    ],
    email: [
      val => val && val.length > 0 || "Introduza um Email",
    ],
    phoneNumber: [
      val => val && val.length > 0 || "Introduza um Número de telefone",
    ],
  }
}
