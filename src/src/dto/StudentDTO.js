export default { input, output, rules }

function input(data) {
  try {
    return {
      id: data.id,
      name: data.name,
      personalEmail: data.personal_email,
      atecEmail: data.atec_email,
      phoneNumber: data.phone_number,
      classes: data.student_collections,
      internships: data.internships
    }
  } catch (error) {
    return null
  }
}

function output(data) {
  try {
    return {
      name: data.name,
      personal_email: data.personalEmail,
      atec_email: data.atecEmail,
      phone_number: data.phoneNumber,
      student_collections: data.classes,
      internships: data.internships
    }
  } catch (error) {
    return null
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  email: [ (val, rules) => rules.email(val)  || 'Introduza um email válido' ],
  phoneNumber: [ val => /^\d{9}$/.test(val) || 'Introduza um telefone válido'],

  // Será necessário validação de turma a partir da criação/update de um aluno?
  //classes: [val => isArray(val) && val.length > 0 || 'Associe uma turma ao aluno'],
}
