import courseDTO from "./CourseDTO"
import companyDTO from "./CompanyDTO"
export default { input, output, rules }

function input(data) {
  try {
    const courses = []
    let hasCoursesKey = false
    if (data.hasOwnProperty('courses')) {
      hasCoursesKey = true
      for (const course of data.courses) {
        courses.push(courseDTO.input(course))
      }
    }
    let company = null
    let hasCompanyKey = false
    if (data.hasOwnProperty('company')) {
      hasCompanyKey = true
      company = companyDTO.input(data.company)
    }
    //const hasCoursesKey = data.hasOwnProperty('course')
    return {
      id: data.id,
      companyName: data.company_name,
      activtySector: data.activty_sector,
      locality: data.locality,
      website: data.website,
      contactName: data.contact_name,
      contactTelephone: data.contact_telephone,
      contactEmail: data.contact_email,
      numberStudents: data.number_students,
      studentProfile: data.student_profile,
      studenTasks: data.student_tasks,
      isPartner: data.is_partner,
      ...(hasCoursesKey && { courses }),
      ...(hasCompanyKey && { company }),
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function output(data) {
  try {
    return {
      name: data.name,
      start_date: data.startDate,
      course_id: data.course.id,
      Courses: data.Courses
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function rules() {
  return {
    name: [ val => val && val.length > 0 || 'Introduza um nome' ],
    startDate: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
    course: [ val => val || 'Selecione um curso'],
  }
}
