export default { input, output, rules }

function input(data) {
  try {
    return {
      id: data.id,
      companyName: data.company_name,
      numberStudents: data.number_students,
      activitySector: data.activity_sector,
      isPartner: data.is_partner==1,
      contactName: data.contact_name,
      contactTelephone: data.contact_telephone,
      contactEmail: data.contact_email,
      website: data.website,
      locality: data.locality,
      studentTasks: data.student_tasks,
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function output(data) {
  try {
    return {
      id: data.id,
      company_name: data.companyName,
      number_students: data.numberStudents,
      activity_sector: data.activitySector,
      is_partner: data.isPartner,
      contact_name: data.contactName,
      contact_telephone: data.contactTelephone,
      contact_email: data.contactEmail,
      website: data.website,
      locality: data.locality,
      student_tasks: data.studentTasks,
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function rules() {
  return {
    name: [ val => !!val || 'Campo Obrigatório' ],
    
  }
}
