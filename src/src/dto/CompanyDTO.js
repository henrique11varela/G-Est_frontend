export class CompanyDTO {
  // id;
  // name;
  // address;
  // postCode;
  // niss;
  // nipc;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.postcode = data.postcode;
    this.niss = data.niss;
    this.nipc = data.nipc;
  }
}
