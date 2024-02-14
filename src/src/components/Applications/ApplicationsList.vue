<template>
  <div class="q-py-md">
    <q-table
      color="primary"
      card-class="bg-grey-1"
      flat bordered
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      hide-no-data
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]"
    />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import applicationsAPI from "src/services/fetches/applications";

const columns = [
  {
    name: "company_name",
    required: true,
    label: "Nome da Empresa",
    align: "left",
    field: row => row.companyName,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "number_of_trainees",
    required: true,
    label: "Numero de Estagiários",
    align: "center",
    field: row => row.numberStudents,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "activity_sector",
    required: true,
    label: "Sector de Atividade",
    align: "left",
    field: row => row.activitySector,
    format: val => `${val}`,
    sortable: true,
  },
  /*{
    name: "course_application",
    required: true,
    label: "Course Application",
    align: "left",
    field: row => row.course_application,
    format: val => `${val}`,
    sortable: true,
  },*/
  {
    name: "partner",
    required: true,
    label: "Parceiro?",
    align: "left",
    field: row => row.isPartner,
    format: val => (val ? "Sim" : "Não"),
    sortable: true,
  },
  {
    name: "contact_name",
    required: true,
    label: "Pessoa de Contacto",
    align: "left",
    field: row => row.contactName,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "student_profile",
    required: true,
    label: "Perfil do Estagiário",
    align: "left",
    field: row => row.studentProfile,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "contact_telephone",
    required: true,
    label: "Contato Telefónico",
    align: "left",
    field: row => row.contactTelephone,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "contact_email",
    required: true,
    label: "Email de Contacto",
    align: "left",
    field: row => row.contactEmail,
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
    field: row => row.studentTasks,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "locality",
    required: true,
    label: "Localidade",
    align: "left",
    field: row => row.locality,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
  },
];

const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 0,
});

async function onRequest (props) {
  const { page, rowsPerPage } = props.pagination
  const filter = props.filter

  loading.value = true

  const params = { page, quantity: rowsPerPage, name: filter }
  const response = await applicationsAPI.index(params)
  rows.value = response.data
  pagination.value = response.pagination

  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})

</script>
