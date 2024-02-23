<script setup>
import { onMounted, ref, defineEmits } from 'vue';


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
    name: 'NameContact', label: 'Nome de Contatos', field: 'NameContact',
    align: 'left',
  },
  {
    name: 'EmailContact', label: 'Email de Contatos', field: 'EmailContact',
    align: 'left',
  },
  {
    name: 'PhoneContact', label: 'Numero de Contacto', field: 'PhoneContact',
    align: 'left',
  },

];
if (store.isAdmin) {
  columns.push({
    name: 'Action', label: '', field: 'action', align: 'center',
  })
}
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

onMounted(() => {
  tableRef.value.requestServerInteraction()


})
</script>

<template>
  <div class="q-py-md">
    <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
      v-model:pagination="pagination" :loading="loading" :filter="filters" binary-state-sort @request="onRequest">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>


      <template v-slot:top>
        <q-space />
        <q-input outlined label="Name" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
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


      <template v-slot:body-cell-NameContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props.row.contacts[0].name }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-EmailContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props.row.contacts[0].email }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-PhoneContact="props">
        <q-td :props="props">
          <span v-if="props.row.contacts.length > 0">
            {{ props.row.contacts[0].phoneNumber }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn :to="`companies/show/${props.row.id}`" unelevated text-color="primary">
            <q-icon name="visibility"></q-icon>
          </q-btn>
          <q-btn v-if="store.isAdmin" :to="`companies/edit/${props.row.id}`" unelevated text-color="secondary">
            <q-icon name="edit"></q-icon>
          </q-btn>
        </q-td>
      </template>

    </q-table>
  </div>
</template>
