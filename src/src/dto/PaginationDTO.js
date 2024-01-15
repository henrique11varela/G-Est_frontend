export default {
  input
}

function input(data) {
  try {
    return {
      total: data.total,
      currentPage: data.currentPage,
      perPage: data.perPage,
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
