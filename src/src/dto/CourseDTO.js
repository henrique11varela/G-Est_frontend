class CourseIn {
  constructor(data) {
    try {
      this.id = data.id
      this.name = data.name
      this.courseType = data.course_type
      this.area = data.area
    } catch (error) {
      console.error("Error:", error)
    }
  }
}

class CourseOut {
  constructor(data) {
    try {
      this.id = data.id
      this.name = data.name
      this.course_type_id = data.course.id
      this.area_id = data.area.id
    } catch (error) {
      console.error("Error:", error)
    }
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  courseTypeId: [ val => val  || 'Selecione o tipo de curso' ],
  areaId: [ val => val || 'Selecione a área de formação'],
}

export { CourseIn, CourseOut, rules }

