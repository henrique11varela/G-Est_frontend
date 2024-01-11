class StudentIn {
  constructor(data) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.personalEmail = data.personal_email;
      this.atecEmail = data.atec_email;
      this.phoneNumber = data.phone_number;
      this.classes = data.student_collections;
      this.internships = data.internships;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

class StudentOut {
  constructor(data) {
    try {
      this.id = data.id;
      this.name = data.name;
      this.personal_email = data.personalEmail;
      this.atec_email = data.atecEmail;
      this.phone_number = data.phoneNumber;
      this.student_collections = data.classes;
      this.internships = data.internships;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const rules = {
  name: [ val => val && val.length > 0 || 'Introduza um nome' ],
  email: [ (val, rules) => rules.email(val)  || 'Introduza um email válido' ],
  phoneNumber: [ val => /^\d{9}$/.test(val) || 'Introduza um telefone válido'],

  // Será necessário validação de turma a partir da criação/update de um aluno?
  //classes: [val => isArray(val) && val.length > 0 || 'Associe uma turma ao aluno'],
}

export { StudentIn, StudentOut, rules }
