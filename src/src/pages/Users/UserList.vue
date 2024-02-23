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
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Utilizadores</h1>
        </div>
        <q-btn dense unelevated color="primary" icon="add" :to="'users/add'" />
      </div>

      <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
        v-model:pagination="pagination" :loading="loading" :filter="filters" binary-state-sort @request="onRequest">

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>


        <template v-slot:top>
          <q-space />
          <q-input outlined="" label="Name" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-input outlined="" label="Email" borderless dense debounce="300" v-model="filters.email" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

        </template>
        <template v-slot:top-right>
          <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
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
