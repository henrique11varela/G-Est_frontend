class InternshipIn {
  constructor(data) {
    try {
      this.id = data.id;
      this.student = data.student;
      this.meal_allowance = data.meal_allowance;
      this.start_date = data.start_date;
      this.address = data.address;
      this.postcode = data.postcode;
      this.observations = data.observations;
      this.tutor = data.company_person;
      this.company = data.company;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

class InternshipOut {
  constructor(data) {
    try {
      if (data.id) this.id = data.id;
      this.student_id = data.student_id;
      this.meal_allowance = data.meal_allowance;
      this.start_date = data.start_date;
      this.address = data.address;
      this.postcode = data.postcode;
      this.observations = data.observations;
      this.tutor_id = data.tutor_id;
      this.company_id = data.company_id;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const rules = {
  student_id: [ val => val || 'Selecione um estudante' ],
  meal_allowance: [ val => val || 'Selecione uma opção' ],
  start_date: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
  address: [ val => val && val.length > 0 || 'Introduza uma morada'],
  postcode: [ val => val && val.length > 0 || 'Introduza um codigo postal'],
  observations: [ val => val && val.length > 0 || 'Introduza uma observação'],
  tutor_id: [ val => val || 'Selecione um tutor'],
  company_id: [ val => val || 'Selecione uma empresa'],
}

export { InternshipIn, InternshipOut, rules }
