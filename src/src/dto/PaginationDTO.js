export default {
  input
}

function input(data) {
  try {
    return {
      total: data.total,
      currentPage: data.current_page,
      perPage: data.per_page,
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
