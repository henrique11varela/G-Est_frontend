export default { input }

function input(data) {
  try {
    return {
      id: data.id,
      areaCode: data.area_code,
      name: data.name,
    }
  } catch (error) {
    return null
  }
}
