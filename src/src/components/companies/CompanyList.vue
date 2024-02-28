<script setup>
import { onMounted, ref, defineEmits } from 'vue';

import CompaniesImport from 'src/components/imports/CompaniesImport.vue'
import companiesAPI from "src/services/fetches/companies.js";
import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
const emit = defineEmits(['request'])
const columns = [
  {
    name: 'Name', label: 'Name', field: 'name',
    align: 'left',
  },
  {
    name: 'NameContact', label: 'Nome do Contato', field: 'NameContact',
    align: 'left',
  },
  {
    name: 'EmailContact', label: 'Email do Contato', field: 'EmailContact',
    align: 'left',
  },
  {
    name: 'PhoneContact', label: 'Numero do Contacto', field: 'PhoneContact',
    align: 'left',
  },

];
columns.push({
  name: 'Action', label: '', field: 'action', align: 'center',
})
const tableRef = ref()
const rows = ref([])
const loading = ref(true)
const filters = ref({
  name: '',
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

function updateTable() {
  tableRef.value.requestServerInteraction()
}

onMounted(() => {
  updateTable()


})
</script>

<template>
  <CompaniesImport @imported="updateTable" v-if="store.isAdmin"></CompaniesImport>
  <div class="q-py-md">
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filters" binary-state-sort @request="onRequest"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]" rows-per-page-label="Registos por página" hide-no-data>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>


      <template v-slot:top>
        <q-space />
        <q-input outlined label="Nome" borderless dense debounce="300" v-model="filters.name" placeholder="Procurar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-NameContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props?.row?.contacts[0]?.name }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-EmailContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props?.row?.contacts[0]?.email }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-PhoneContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props?.row?.contacts[0]?.phoneNumber }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn :to="`companies/show/${props?.row?.id}`" unelevated text-color="primary">
            <q-icon name="visibility"></q-icon>
          </q-btn>
          <q-btn v-if="store.isAdmin" :to="`companies/edit/${props?.row?.id}`" unelevated text-color="secondary">
            <q-icon name="edit"></q-icon>
          </q-btn>
        </q-td>
      </template>

    </q-table>
  </div>
</template>
