export default { input, output, rules }




function input(data) {
  return {
    name: data.name,
    email: data.email,
    id: data.id,
    role: data.role
  }
}


function output(data) {
  return {
    name: data.name,
    email: data.email,
    id: data.id,
    role: data.role,
    password: data.password,

  }
}
function rules() {
  return {
    name: [
      val => val && val.length > 0 || "Introduza um nome",

    ],
  }
}
