<template>
  <div class="q-pa-md">
    <q-table card-class="bg-grey-1" flat bordered :rows="internships" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" @request="onRequest" :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="primary" @click="console.log(props.key)">
            <q-icon name="visibility"></q-icon>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import internshipsAPI from "../../services/fetches/internships.js";

const internships = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const loading = ref(false);
const filter = ref("")

async function request(params) {
  loading.value = true
  const output = await internshipsAPI.index(params)
  internships.value = output.data
  pagination.value.page = output.pagination.current_page
  pagination.value.rowsPerPage = output.pagination.per_page
  pagination.value.rowsNumber = output.pagination.total
  loading.value = false
}

onMounted(async () => {
  await request()
});

const columns = [
  {
    name: 'student',
    required: true,
    label: 'Aluno',
    align: 'left',
    field: row => row.student.name,
  },
  {
    name: 'company',
    required: true,
    label: 'Empresa',
    align: 'left',
    field: row => row.company.name,
  },
  {
    name: 'tutor',
    required: true,
    label: 'Tutor',
    align: 'left',
    field: row => row.tutor.name,
  },
  {
    name: 'start_date',
    required: true,
    label: 'Data Inicio',
    align: 'left',
    field: row => row.start_date,
  },
  {
    name: 'actions',
    align: 'center',
  }
]

async function onRequest(props) {

  const { page, rowsPerPage } = props.pagination
  // const filter = props.filter
  const params = {
    page: page,
    quantity: rowsPerPage,
  }
  loading.value = true
  await request(params)
  loading.value = false
}

</script>

<style scoped></style>
