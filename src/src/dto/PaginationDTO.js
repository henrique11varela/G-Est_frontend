export default {
  input
}

function input(data) {
  try {
    return {
      rowsNumber: data.total,
      page: data.current_page,
      rowsPerPage: data.per_page,
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
