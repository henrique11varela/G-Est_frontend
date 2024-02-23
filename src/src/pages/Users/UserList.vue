<script setup>
import { computed, onMounted, ref } from 'vue';
import userAPI from "src/services/fetches/users.js";

import { matEdit, matDelete } from '@quasar/extras/material-icons'
const columns = [
  { name: 'id', align: 'center', label: 'Id', field: 'id', },
  { name: 'name', label: 'Name', field: 'name', },
  { name: 'email', label: 'Email', field: 'email', },
  { name: 'role', label: 'Role', field: 'role', },
  { name: 'action', label: 'Action', field: 'action', }
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
  const usersRequest = await userAPI.index({
    ...filters,
    quantity: rowsPerPage,
    page: page,
  });
  rows.value.splice(0, rows.value.length, ...usersRequest.Data);

  pagination.value = usersRequest.pagination;
  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
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
          <q-input outlined="" label="Nome" borderless dense debounce="300" v-model="filters.name" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-input outlined="" label="Email" borderless dense debounce="300" v-model="filters.email" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn :to="`users/${props.row.id}`" unelevated :icon="matEdit" text-color="secondary"></q-btn>
          </q-td>
        </template>


      </q-table>
    </div>
  </q-page>
</template>
