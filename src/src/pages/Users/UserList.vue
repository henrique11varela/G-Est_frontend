<script setup>
import { computed, onMounted, ref } from 'vue';
import { get } from "src/services/fetches/users.js";

const columns = [
  { name: 'Id', align: 'center', label: 'Id', field: 'id', },
  { name: 'Name', label: 'Name', field: 'name', },
  { name: 'Email', label: 'Email', field: 'email', },
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

  pagination.value.page = companiesRequest.Pagination.from;
  pagination.value.rowsPerPage = companiesRequest.Pagination.per_page;
  pagination.value.rowsNumber = companiesRequest.Pagination.total;
  console.log(pagination)
  loading.value = false
}
onMounted(async () => {
  const companiesRequest = await get();
  rows.value = companiesRequest.Data;
  pagination.value.page = companiesRequest.Pagination.from;
  pagination.value.rowsPerPage = companiesRequest.Pagination.per_page;
  pagination.value.rowsNumber = companiesRequest.Pagination.total;


  loading.value = false;


})
</script>

<template>
  <q-page padding>
    <!-- content -->
    <h1>Companhias</h1>
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort
      @request="onRequest"></q-table>
  </q-page>
</template>
