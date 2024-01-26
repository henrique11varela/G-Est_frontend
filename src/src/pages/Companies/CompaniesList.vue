<script setup>
import { computed, onMounted, ref, defineEmits } from 'vue';

import { useQuasar } from 'quasar'

import companiesAPI from "src/services/fetches/companies.js";

const emit = defineEmits(['request'])
const columns = [
  { name: 'Name', label: 'Name', field: 'name', },
  { name: 'numberOfContact', label: 'Numero de Contatos', field: 'numberOfContact', },
  { name: 'NISS', label: 'NISS', field: 'niss', },
  { name: 'Action', label: 'Action', field: 'action', }
];

const tableRef = ref()
const rows = ref([])
const loading = ref(true)
const filters = ref({
  id: '',
  name: '',
  address: '',
  postcode: '',
  niss: '',
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
  const companiesRequest = await companiesAPI.index({
    ...filters.value,
    quantity: rowsPerPage,
    page: page,
  });
  rows.value.splice(0, rows.value.length, ...companiesRequest.data);

  pagination.value = companiesRequest.pagination;
  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()


})
</script>

<template>
  <q-page padding>
    <!-- content -->
    <h1>Empresas</h1>
    <div>
      <q-btn color="primary" :disable="loading" label="Adicionar" :to="`companies/add`" />
    </div>
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filters" binary-state-sort @request="onRequest">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>


      <template v-slot:top>
        <q-space />
        <q-input label="Name" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />
        <q-input label="Address" borderless dense debounce="300" v-model="filters.address" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />

        <q-input label="Post Code" borderless dense debounce="300" v-model="filters.postcode" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />

        <q-input label="NIIS" borderless dense debounce="300" v-model="filters.niss" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />

        <q-input label="NIPC" borderless dense debounce="300" v-model="filters.nipc" placeholder="Search">
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


      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn :to="`companies/show/${props.row.id}`" unelevated text-color="primary">
            <q-icon name="visibility"></q-icon>
          </q-btn>
          <q-btn :to="`companies/edit/${props.row.id}`" unelevated text-color="secondary">
            <q-icon name="edit"></q-icon>
          </q-btn>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>
