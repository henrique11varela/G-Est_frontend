class ClassIn {
  constructor(data) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.startDate = data.start_date;
      this.course = data.course;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

class ClassOut {
  constructor(data) {
    try {
      if (data.id) this.id = data.id;
      this.name = data.name;
      this.start_date = data.startDate;
      this.course_id = data.course;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  startDate: [ (val, rules) => rules.date(val)  || 'Introduza uma data válida' ],
  course: [ val => val || 'Selecione um curso'],
}

export { ClassIn, ClassOut, rules }

