import studentDTO from "./StudentDTO"
export default { input, output, rules }

function input(data) {
  try {
    const students = []
    let hasStudentsKey = false
    if (data.hasOwnProperty('students')) {
      hasStudentsKey = true
      for (const student of data.students) {
        students.push(new studentDTO.input(student))
      }
    }
    const hasCourseKey = data.hasOwnProperty('course')
    return {
      id: data.id,
      name: data.name,
      startDate: data.start_date,
      ...(hasStudentsKey && { students }),
      ...(hasCourseKey && { course: data.course }),
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
      start_date: data.startDate,
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
    startDate: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
    course: [ val => val || 'Selecione um curso'],
  }
}
