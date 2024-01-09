export  class PaginationDTO {
  /*from;
  lastPage;
  total;
  current_page;*/
  constructor(from, last_page, total, current_page, per_page) {
    this.from = from
    this.lastPage = last_page
    this.total = total
    this.current_page = current_page
    this.per_page = per_page
  }
}
