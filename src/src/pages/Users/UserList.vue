<script setup>
import { computed, onMounted, ref } from 'vue';
import { get } from "src/services/fetches/users.js";

import { matEdit, matDelete } from '@quasar/extras/material-icons'
const columns = [
  { name: 'Id', align: 'center', label: 'Id', field: 'id', },
  { name: 'Name', label: 'Name', field: 'name', },
  { name: 'Email', label: 'Email', field: 'email', },
  { name: 'Action', label: 'Action', field: 'action', }
];


const tableRef = ref()
const rows = ref([])
const loading = ref(true)
const filters = ref({
  id: '',
  name: '',
  email: '',
})
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 15
})

async function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  loading.value = true
  const companiesRequest = await get(page, props.filter, rowsPerPage);
  rows.value.splice(0, rows.value.length, ...companiesRequest.Data);

  pagination.value.page = page;
  pagination.value.rowsNumber = companiesRequest.Pagination.total;
  pagination.value.rowsPerPage = rowsPerPage
  loading.value = false
}
onMounted(() => {
  tableRef.value.requestServerInteraction()

})
</script>

<template>
  <q-page padding>
    <!-- content -->
    <h1>Users</h1>
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filters" binary-state-sort @request="onRequest">

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>


      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Adicionar" :to="`users/add`" />
        <q-space />
        <q-input label="Name" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />
        <q-input label="Email" borderless dense debounce="300" v-model="filters.email" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          <q-btn :to="`users/${props.row.id}`" unelevated :icon="matEdit" text-color="secondary"></q-btn>
        </q-td>
      </template>


    </q-table>
  </q-page>
</template>
