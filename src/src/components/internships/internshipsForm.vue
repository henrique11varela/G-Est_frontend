<template>
  <div>
    <q-form class="q-ma-lg" @submit.prevent="onSubmit">

      <q-input class="q-mb-lg" outlined v-model="student.name" :loading="loading.student" label="Aluno" readonly />

      <q-input outlined v-model="internshipData.tutor_id" :rules="InternshipDTO.rules().tutor_id" lazy-rules="ondemand"
        label="Tutor" :disable="true" />

      <q-input filled v-model="internshipData.start_date" mask="date" :rules="InternshipDTO.rules().start_date"
        lazy-rules="ondemand" label="Data de inicio">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="internshipData.start_date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input outlined v-model="internshipData.address" :rules="InternshipDTO.rules().address" lazy-rules="ondemand"
        label="Morada" />

      <q-input outlined v-model="internshipData.postcode" mask="####-###" fill-mask
        :rules="InternshipDTO.rules().postcode" lazy-rules="ondemand" label="Codigo postal" />

      <q-checkbox outlined v-model="internshipData.meal_allowance" label="Refeição" />

      <q-input outlined v-model="internshipData.observations" :rules="InternshipDTO.rules().observations"
        lazy-rules="ondemand" label="Observações" />

      <q-table flat bordered title="Empresas" ref="tableRef" :rows="companies" :columns="companiesColumns" row-key="id"
        selection="single" v-model:pagination="companiesPagination" :loading="loading.companies"
        v-model:selected="selectedCompany" @request="onRequest" :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>

      <q-btn color="primary" type="submit">Submit</q-btn>
      <q-btn>Reset</q-btn>
      {{ internshipData }}
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import InternshipDTO from "../../dto/InternshipDTO.js";
import studentsAPI from "../../services/fetches/students.js";
import companiesAPI from "../../services/fetches/companies.js";
import internshipsAPI from "../../services/fetches/internships.js";

const route = useRoute();
const tableRef = ref();
const loading = ref({
  companies: false,
  student: false,
});

const student = ref({});
const companies = ref([]);
const selectedCompany = ref();

const companiesColumns = [
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "niss",
    required: true,
    label: "NISS",
    align: "left",
    field: (row) => row.niss,
    format: (val) => `${val}`,
    sortable: true,
  }
];

const companiesPagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const internshipData = ref({
  student_id: route.params.id,
  company_id: "",
  tutor_id: "",
  start_date: "",
  address: "",
  postcode: "",
  meal_allowance: false,
  observations: "",
});

watch(selectedCompany, (newValue) => {
  console.log(newValue)
  internshipData.value.company_id = newValue[0].id
  internshipData.value.tutor_id = ""
})

async function fetchStudent() {
  loading.value.student = true;
  const data = await studentsAPI.show(route.params.id)
  student.value = data
  loading.value.student = false;
}

async function onRequest(props) {

  const { page, rowsPerPage } = props.pagination
  // const filter = props.filter
  const params = {
    page: page,
    quantity: rowsPerPage,
  }
  loading.value.companies = true;
  const data = await companiesAPI.index(params)
  companies.value = data.data
  companiesPagination.value = data.pagination
  loading.value.companies = false;
}

onMounted(() => {
  fetchStudent()
  tableRef.value.requestServerInteraction()
})

function onSubmit() {
  console.log(internshipData.value)
  internshipsAPI.store(internshipData.value)
}

</script>

<style scoped></style>
