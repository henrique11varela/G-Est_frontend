export default {
  input,
  output,
  rules
}
function input(data) {
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    postcode: data.postcode,
    tutor_people: data.tutor_people,
    // tutor_people: CompanyPeopleDTO.input(data.tutor_people),
    niss: data.niss,
    nipc: data.nipc,
  }
}
function output(data) {
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    postcode: data.postcode,
    niss: data.niss,
    nipc: data.nipc,
  }
}
function rules() {
  return {
    name: [
      val => val && val.length > 0 || "Introduza um nome",

    ],
  }
}
