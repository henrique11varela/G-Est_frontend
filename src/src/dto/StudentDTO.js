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
        studentClasses.push(classDTO.input(studentClass))
      }
    }
    const internships = []
    let hasIntershipsKey = false
    if (data.hasOwnProperty('internships')) {
      hasIntershipsKey = true
      for (const internship of data.internships) {
        internships.push(internshipDTO.input(internship))
      }
    }
    return {
      id: data.id,
      name: data.name,
      personalEmail: data.personal_email,
      atecEmail: data.atec_email,
      phoneNumber: data.phone_number,
      address: data.address,
      postalCode: data.postal_code,
      locality: data.locality,
      softSkills: data.soft_skills,
      hardSkills: data.hard_skills,
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
      id: data.id,
      name: data.name,
      personal_email: data.personalEmail,
      atec_email: data.atecEmail,
      phone_number: data.phoneNumber,
      address: data.address,
      postal_code: data.postalCode,
      locality: data.locality,
      soft_skills: data.softSkills,
      hard_skills: data.hardSkills,
      ...(data.hasOwnProperty('classes') && { student_collections: data.classes }),
      ...(data.hasOwnProperty('internships') && { internships: data.internships }),
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
    phoneNumber: [ val => val && val.length > 0 || 'Introduza um telefone' ],
    address: [ val => val && val.length > 0 || 'Introduza uma morada' ],
    postalCode: [ val => /^\d{4}-\d{3}$/.test(val) || 'Introduza um código postal válido' ],
    locality: [ val => val && val.length > 0 || 'Introduza uma localidade' ],
    skills: (skill) => [ val => val && val.length > 0 || `Selecione valor para ${skill} skills` ],
  }
}
