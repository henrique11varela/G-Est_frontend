export default { input, output, rules };
import StudentDTO from "./StudentDTO.js";
import ClassDTO from "./ClassDTO.js";
import CompanyDTO from "./CompanyDTO.js";
import CompanyPeopleDTO from "./CompanyPeopleDTO.js";
import CompanyAddressDTO from "./CompanyAddressDTO.js";

function input(data) {
  try {
    //student
    let student = null;
    let hasStudentKey = false;
    if (data.hasOwnProperty("student")) {
      hasStudentKey = true;
      student = new StudentDTO.input(data.student);
    }

    //studentCollection
    let studentCollection = null;
    let hasStudentCollectionKey = false;
    if (data.hasOwnProperty("student_collection")) {
      hasStudentCollectionKey = true;
      studentCollection = new ClassDTO.input(data.student_collection);
    }

    //companies
    const companiesArray = [];
    let hasCompaniesKey = false;
    if (data.hasOwnProperty("companies")) {
      hasCompaniesKey = true;
      for (const company of data.companies) {
        companiesArray.push(new CompanyDTO.input(company));
      }
    }

    //startedInternship
    let startedInternship = null;
    if (data.started_internship) {
      startedInternship = {};
      startedInternship.mealAllowance = data.started_internship.meal_allowance;
      startedInternship.startDate = data.started_internship.start_date;
      //companyAddress
      let companyAddress = null;
      if (data.started_internship.hasOwnProperty("company_address")) {
        companyAddress = new CompanyAddressDTO.input(
          data.started_internship.company_address
        );
      }
      startedInternship.address = companyAddress;

      //companyPerson
      let companyPerson = null;
      if (data.started_internship.hasOwnProperty("company_person")) {
        companyPerson = new CompanyPeopleDTO.input(
          data.started_internship.company_person
        );
      }
      startedInternship.tutor = companyPerson;
    }

    //endedInternship
    let endedInternship = null;
    if (data.ended_internship) {
      endedInternship = {};
      endedInternship.reason = data.ended_internship.reason;
      endedInternship.endDate = data.ended_internship.end_date;
      endedInternship.isWorkingThere = data.ended_internship.is_working_there;
    }

    return {
      id: data.id,
      ...(hasStudentKey && { student }),
      ...(hasStudentCollectionKey && { class: studentCollection }),
      ...(hasCompaniesKey && { companies: companiesArray }),
      observations: data.observations,
      startedInternship: startedInternship,
      endedInternship: endedInternship,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

//TODO: missing started and ended internship
function output(data) {
  try {
    const outputPayload = {
      student_id: data.student_id,
      student_collection_id: data.student_collection_id,
      observations: data.observations,
      companies: data.companies,

      started_internship: null,
      ended_internship: null,
    };
    return outputPayload;
  } catch (error) {
    console.error("Error:", error);
  }
}

function rules() {
  return {
    student_id: [(val) => val || "Selecione um estudante"],
    meal_allowance: [(val) => val || "Selecione uma opção"],
    start_date: [
      (val, rules) => rules.date(val) || "Introduza uma data válida",
    ],
    address: [(val) => (val && val.length > 0) || "Introduza uma morada"],
    postcode: [
      (val) => (val && val.length > 0) || "Introduza um codigo postal",
    ],
    observations: [
      (val) => (val && val.length > 0) || "Introduza uma observação",
    ],
    tutor_id: [(val) => val || "Selecione um tutor"],
    company_id: [(val) => val != "" || "Selecione uma empresa"],
  };
}
