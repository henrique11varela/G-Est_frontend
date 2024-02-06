import studentDTO from "./StudentDTO"
import internshipDTO from "./InternshipDTO"
import courseDTO from "./CourseDTO"
export default { input, output, rules }

function input(data) {
  try {
    const students = []
    let hasStudentsKey = false
    if (data.hasOwnProperty('students')) {
      hasStudentsKey = true
      for (const student of data.students) {
        students.push(studentDTO.input(student))
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
    const hasCourseKey = data.hasOwnProperty('course')
    return {
      id: data.id,
      name: data.name,
      ...(hasStudentsKey && { students }),
      ...(hasCourseKey && { course: courseDTO.input(data.course) }),
      ...(hasIntershipsKey && { internships }),
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function output(data) {
  try {
    const students = []
    let hasStudentsKey = false
    if (data.hasOwnProperty('students')) {
      hasStudentsKey = true
      for (const student of data.students) {
        students.push(student.id)
      }
    }
    return {
      name: data.name,
      course_id: data.course.id,
      ...(hasStudentsKey && { students }),
    }
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

function rules() {
  return {
    name: [ val => val && val.length > 0 || 'Introduza um nome' ],
    course: [ val => val || 'Selecione um curso'],
  }
}
