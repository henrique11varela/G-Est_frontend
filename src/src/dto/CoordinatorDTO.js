export default { input, output, rules }

function input(data) {
  try {
    return {
      id: data.id,
      name: data.name,
      emailAtec: data.email_atec,
      phoneNumber: data.phone_number,
    }
  } catch (error) {
    return null
  }
}

function output(data) {
  try {
    return {
      id: data.id,
      name: data.name,
      email_atec: data.emailAtec,
      phone_number: data.phoneNumber
    }
  } catch (error) {
    return null
  }
}

function rules() {
  return {
    name: [ val => val && val.length > 0 || 'Introduza um nome' ],
    email: [ (val, rules) => rules.email(val)  || 'Introduza um email válido' ],
    phoneNumber: [ val => val && val.length > 0 || 'Introduza um telefone' ],
  }
}
