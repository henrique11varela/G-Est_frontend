import areaDTO from "./AreaDTO"
export default { input, output, rules }

function input(data) {
  try {
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      ...(data.hasOwnProperty('area') && { area: new areaDTO.input(data.area) }),
      hourlyLoad: data.hourly_load
    }
  } catch (error) {
    return null
  }
}

function output(data) {
  try {
    return {
      name: data.name,
      type: data.type,
      area_id: data.area.id,
      hourly_load: data.hourlyLoad
    }
  } catch (error) {
    return null
  }
}

function rules() {
  return {
    name: [ val => val && val.length > 0 || 'Introduza um nome' ],
    type: [ val => val || 'Selecione o tipo de curso' ],
    area: [ val => val || 'Selecione a área de formação' ],
    hourlyLoad: [ val => /^\d+$/.test(val) || 'Introduza uma carga horária válida' ],
  }
}
