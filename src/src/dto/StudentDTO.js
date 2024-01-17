export default { input, output, rules }
import classDTO from "./ClassDTO"
import internshipDTO from "./InternshipDTO"

function input(data) {
  try {
    const studentClasses = []
    let hasStudentCollectionsKey = false
    if (data.hasOwnProperty('student_collections')) {
      hasStudentCollectionsKey = true
      for (const studentClass of data.student_collections) {
        studentClasses.push(new classDTO.input(studentClass))
      }
    }
    const internships = []
    let hasIntershipsKey = false
    if (data.hasOwnProperty('internships')) {
      hasIntershipsKey = true
      for (const internship of data.internships) {
        internships.push(new internshipDTO.input(internship))
      }
    }
    return {
      id: data.id,
      name: data.name,
      personalEmail: data.personal_email,
      atecEmail: data.atec_email,
      phoneNumber: data.phone_number,
      ...(hasStudentCollectionsKey && { classes: studentClasses }),
      ...(hasIntershipsKey && { internships: internships })
    }
  } catch (error) {
    console.error('Error: ' + error)
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
    console.error("Error:", error)
    return null
  }
}

function rules() {
  return {
    name: [ val => val && val.length > 0 || 'Introduza um nome' ],
    email: [ (val, rules) => rules.email(val)  || 'Introduza um email válido' ],

    //phoneNumber: [ val => /^\d{9}$/.test(val) || 'Introduza um telefone válido'],

    // Será necessário validação de turma a partir da criação/update de um aluno?
    //classes: [val => isArray(val) && val.length > 0 || 'Associe uma turma ao aluno'],
  }
}
