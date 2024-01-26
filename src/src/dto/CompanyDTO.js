import CompanyPeopleDTO from "./CompanyPeopleDTO";
import CompanyAddressDTO from "./CompanyAddressDTO"
export default {
  input,
  output,
  rules
}
function input(data) {

  try{
    const peoples = []
    let hasPeopleKey = false
    if (data.hasOwnProperty('company_people')) {
      hasPeopleKey = true
      for (const people of data.company_people) {
        peoples.push(new CompanyPeopleDTO.input(people))
      }
    }


    const addresses = []
    let hasAddressesKey = false
    if (data.hasOwnProperty('company_addresses')) {
      hasAddressesKey = true
      for (const people of data.company_addresses) {
        addresses.push(new CompanyAddressDTO.input(people))
      }
    }
    console.log(addresses);
    return {
      id: data.id,
      name: data.name,
      niss: data.niss,
      nipc: data.nipc,
      ...(hasPeopleKey && { peoples }),
      ...(hasAddressesKey && {addresses})
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
function output(data) {
  return {
    id: data.id,
    name: data.name,
    niss: data.niss,
    nipc: data.nipc,
  }
}
function rules() {
  return {
    name: [
      val => val && val.length > 0 || "Introduza um nome",
    ],
    niss: [
      val => val && val.length > 0 || "Introduza um nome",
    ],
    nipc:[
      val => val && val.length > 0 || "Introduza um nome",
    ]
  }
}
