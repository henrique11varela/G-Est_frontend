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
        companiesArray.push(CompanyDTO.input(company));
      }
    }

    //startedInternship
    let startedInternship = null;
    if (data.started_internship) {
      startedInternship = {};
      startedInternship.mealAllowance = data.started_internship.meal_allowance > 0;
      startedInternship.hqShippingAddress = data.started_internship.hq_shipping_address > 0;
      startedInternship.hourlyLoad = data.started_internship.hourly_load;
      startedInternship.startDate = data.started_internship.start_date?.split('').slice(0,10).join('').replace(/-/g, '/');
      startedInternship.endDate = data.started_internship.end_date?.split('').slice(0,10).join('').replace(/-/g, '/');
      //companyAddress
      let companyAddress = null;
      if (data.started_internship.hasOwnProperty("company_address") && data.started_internship.company_address != null) {
        companyAddress = CompanyAddressDTO.input(
          data.started_internship.company_address
        );
      }
      startedInternship.address = companyAddress;

      //companyPerson
      let companyPerson = null;
      if (data.started_internship.hasOwnProperty("company_person") && data.started_internship.company_person != null) {
        companyPerson = CompanyPeopleDTO.input(
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
      endedInternship.situacaoProf = data.ended_internship.situacao_prof;
      endedInternship.comoObteveEmprego = data.ended_internship.como_obteve_emprego;
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

function output(data) {
  try {

    let started_internship = null;
    if (data.startedInternship) {
      started_internship = {
        meal_allowance: data.startedInternship.mealAllowance ? 1 : 0,
        hourly_load: data.startedInternship.hourlyLoad,
        hq_shipping_address: data.startedInternship.hqShippingAddress,
        start_date: data.startedInternship.startDate,
        end_date: data.startedInternship.endDate,
        company_address_id: data.startedInternship.address?.id || null,
        company_person_id: data.startedInternship.tutor?.id || null,
      };
    }

    let ended_internship = null;
    if (data.endedInternship) {
      ended_internship = {
        reason: data.endedInternship.reason,
        situacao_prof: data.endedInternship.situacaoProf,
        como_obteve_emprego: data.endedInternship.comoObteveEmprego,
      };
    }

    const outputPayload = {
      student_id: data.student.id,
      student_collection_id: data.class.id,
      observations: data.observations,
      companies: data.companies.map((item) => {
        return {
          id: item.id,
          status: item.status,
        }
      }),

      started_internship: started_internship,
      ended_internship: ended_internship,
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
