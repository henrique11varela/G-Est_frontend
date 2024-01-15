import studentDTO from "./StudentDTO"
export default { input, output, rules }

function input(data) {
  try {
    const students = []
    for (const student of data.students) {
      students.push(new studentDTO.input(student))
    }
    return {
      id: data.id,
      name: data.name,
      startDate: data.start_date,
      course: data.course,
      students: students,
    }
  } catch (error) {
    return null
  }
}

function output(data) {
  try {
    return {
      name: data.name,
      startDate: data.data.start_date,
      course: data.course,
      students: data.students
    }
  } catch (error) {
    return null
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  startDate: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
  course: [ val => val || 'Selecione um curso'],
}
