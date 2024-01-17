<template>
  <div class="q-pa-md">
    <q-table
      title="Lista de Solicitações"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
  </div>
</template>
<script>
const columns = [
  {
    name: "company_name",
    required: true,
    label: "Company Name",
    align: "left",
    field: row => row.company_name,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "number_of_trainees",
    required: true,
    label: "Number of Trainees",
    align: "left",
    field: row => row.number_of_trainees,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "activity_sector",
    required: true,
    label: "Activity Sector",
    align: "left",
    field: row => row.activity_sector,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "course_application",
    required: true,
    label: "Course Application",
    align: "left",
    field: row => row.course_application,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "partner",
    required: true,
    label: "Partner?",
    align: "left",
    field: row => row.partner,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "contact_name",
    required: true,
    label: "Contact Name",
    align: "left",
    field: row => row.contact_name,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "student_profile",
    required: true,
    label: "Student Profile",
    align: "left",
    field: row => row.student_profile,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "contact_telephone",
    required: true,
    label: "Contact Telephone",
    align: "left",
    field: row => row.contact_telephone,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "contact_email",
    required: true,
    label: "Contact Email",
    align: "left",
    field: row => row.contact_email,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "website",
    required: true,
    label: "Website",
    align: "left",
    field: row => row.website,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "student_tasks",
    required: true,
    label: "Student Tasks",
    align: "left",
    field: row => row.student_tasks,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "locality",
    required: true,
    label: "Locality",
    align: "left",
    field: row => row.locality,
    format: val => `${val}`,
    sortable: true,
  },
];

const rows =[
  {
    id: 1,
    company_name: "Company 1",
    number_of_trainees: 1,
    activity_sector: "Sector 1",
    course_application: "Application 1",
    partner: "Yes",
    contact_name: "Contact 1",
    student_profile: "Profile 1",
    contact_telephone: "Telephone 1",
    contact_email: "Email 1",
    website: "Website 1",
    student_tasks: "Tasks 1",
    locality: "Locality 1",
  },
  {
    id: 2,
    company_name: "Company 2",
    number_of_trainees: 2,
    activity_sector: "Sector 2",
    course_application: "Application 2",
    partner: "No",
    contact_name: "Contact 2",
    student_profile: "Profile 2",
    contact_telephone: "Telephone 2",
    contact_email: "Email 2",
    website: "Website 2",
    student_tasks: "Tasks 2",
    locality: "Locality 2",
  },
  {
    id: 3,
    company_name: "Company 3",
    number_of_trainees: 3,
    activity_sector: "Sector 3",
    course_application: "Application 3",
    partner: "Yes",
    contact_name: "Contact 3",
    student_profile: "Profile 3",
    contact_telephone: "Telephone 3",
    contact_email: "Email 3",
    website: "Website 3",
    student_tasks: "Tasks 3",
    locality: "Locality 3",
  },
  {
    id: 4,
    company_name: "Company 4",
    number_of_trainees: 4,
    activity_sector: "Sector 4",
    course_application: "Application 4",
    partner: "No",
    contact_name: "Contact 4",
    student_profile: "Profile 4",
    contact_telephone: "Telephone 4",
    contact_email: "Email 4",
    website: "Website 4",
    student_tasks: "Tasks 4",
    locality: "Locality 4",
  },
  {
    id: 5,
    company_name: "Company 5",
    number_of_trainees: 5,
    activity_sector: "Sector 5",
    course_application: "Application 5",
    partner: "Yes",
    contact_name: "Contact 5",
    student_profile: "Profile 5",
    contact_telephone: "Telephone 5",
    contact_email: "Email 5",
    website: "Website 5",
    student_tasks: "Tasks 5",
    locality: "Locality 5",
  }
]

export default {
  setup() {
    return {
      columns,
      rows
    };
  },
};
</script>

<style lang="scss" scoped></style>
