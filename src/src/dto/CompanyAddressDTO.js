export default {
  input,
  output,
  rules
}
function input(data) {
  return {
    id: data.id,
    description: data.description,
    address: data.address,
    postalCode: data.postal_code,
    companyId: data.company_id
  }
}
function output(data) {
  return {
    id: data.id,
    description: data.description,
    address: data.address,
    postal_code: data.postalCode,
    company_id: data.companyId
  }
}
function rules() {
  return {
    description: [
      val => val && val.length > 0 || "Introduza uma descrição",
    ],
    address: [
      val =>  val && val.length > 0 || "Introduza uma Morada",
    ],
    postalCode: [
      val =>  val && val.length > 0 || "Introduza um Codigo Postal",
    ]
  }
}
