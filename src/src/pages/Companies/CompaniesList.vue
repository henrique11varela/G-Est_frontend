<script setup>
import { computed, onMounted, ref, defineEmits } from 'vue';


import { matEdit, matDelete } from '@quasar/extras/material-icons'

import { fasFont } from '@quasar/extras/fontawesome-v5'
import { get, deleteCompany } from "src/services/fetches/companies.js";

const emit = defineEmits(['request'])
const columns = [
  { name: 'Id', align: 'center', label: 'Id', field: 'id', },
  { name: 'Name', label: 'Name', field: 'name', },
  { name: 'Address', label: 'Address', field: 'address', },
  { name: 'PostCode', label: 'PostCode', field: 'postcode', },
  { name: 'NISS', label: 'NISS', field: 'niss', },
  { name: 'NIPC', label: 'NIPC', field: 'nipc', },
  { name: 'Action', label: 'Action', field: 'action', }
];

const tableRef = ref()
const rows = ref([])
const filter = ref('')
const loading = ref(true)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 0,
  rowsNumber: 0
})

async function onRequest(props) {

  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  loading.value = true

  const companiesRequest = await get(page);
  rows.value = companiesRequest.Data;

  pagination.value.page = companiesRequest.Pagination.currentPage;
  pagination.value.rowsPerPage = companiesRequest.Pagination.perPage;
  pagination.value.rowsNumber = companiesRequest.Pagination.total;
  console.log(pagination)
  loading.value = false
}
onMounted(async () => {
  const companiesRequest = await get();
  rows.value = companiesRequest.Data;
  pagination.value.page = companiesRequest.Pagination.currentPage;
  pagination.value.rowsPerPage = companiesRequest.Pagination.perPage;
  pagination.value.rowsNumber = companiesRequest.Pagination.total;


  loading.value = false;


})
</script>

<template>
  <q-page padding>
    <!-- content -->
    <h1>Companhias</h1>
    <q-table flat bordered ref="tableRef" title="Treats" :loading="loading" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :filter="filter" binary-state-sort @request="onRequest">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>


      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Adicionar" :to="`companies/add`" />
        <q-space />
      </template>

      <template v-slot:top-right>
        <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>


      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn :to="`companies/edit/${props.row.id}`" unelevated :icon="matEdit" text-color="secondary"></q-btn>
          <q-btn @click="async () => {
            await deleteCompany(props.row.id)
          }" unelevated :icon="matDelete" text-color="red"></q-btn>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>
