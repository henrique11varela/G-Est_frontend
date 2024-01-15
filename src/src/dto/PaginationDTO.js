export  class PaginationDTO {
  /*from;
  lastPage;
  total;
  current_page;*/
  constructor(total, currentPage, perPage) {
    this.total = total
    this.currentPage = currentPage
    this.perPage = perPage
  }
}
