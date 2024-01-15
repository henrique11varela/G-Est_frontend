class ClassIn {
  constructor(data) {
    try {
      this.id = data.id
      this.name = data.name
      this.startDate = data.start_date
      this.course = data.course
      const students = []
      for (const student of data.students) {
        students.push(new StudentIn(student))
      }
      this.students = students
    } catch (error) {
      console.error("Error:", error)
    }
  }
}

class ClassOut {
  constructor(data) {
    try {
      this.name = data.name
      this.start_date = data.startDate
      this.course_id = data.course
      this.students = data.students
    } catch (error) {
      console.error("Error:", error)
    }
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  startDate: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
  course: [ val => val || 'Selecione um curso'],
}

import { StudentIn } from "./StudentDTO"
export { ClassIn, ClassOut, rules }

