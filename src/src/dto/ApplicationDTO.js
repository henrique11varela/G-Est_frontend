import courseDTO from "./StudentDTO"
export default { input, output, rules }

function input(data) {
  try {
    const courses = []
    let hasCoursesKey = false
    if (data.hasOwnProperty('courses')) {
      hasCoursesKey = true
      for (const course of data.courses) {
        courses.push(new studentDTO.input(student))
      }
    }
    //const hasCoursesKey = data.hasOwnProperty('course')
    return {
      id: data.id,
      name: data.name,
      startDate: data.start_date,
      ...(hasCoursesKey && { courses }),
      ...(hasCoursesKey && { course: data.course }),
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
