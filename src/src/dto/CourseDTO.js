export default { input, output, rules }

function input(data) {
  try {
    return {
      id: data.id,
      name: data.name,
      courseType: data.course_type,
      area: data.area
    }
  } catch (error) {
    return null
  }
}

function output(data) {
  try {
    return {
      name: data.name,
      course_type_id: data.course.id,
      area_id: data.area.id
    }
  } catch (error) {
    return null
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  courseTypeId: [ val => val  || 'Selecione o tipo de curso' ],
  areaId: [ val => val || 'Selecione a área de formação'],
}
