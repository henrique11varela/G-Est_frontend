<script setup>
import { onMounted, ref, defineEmits, defineProps } from 'vue';
import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
const props = defineProps({
  addresses: Array,
  companyid: Number
})
const emit = defineEmits(['request'])
const columns = [
  { name: 'description', label: 'Description', field: 'description', align: 'left', },
  { name: 'address', label: 'Address', field: 'address', align: 'left', },
  { name: 'postalCode', label: 'Postal Code', field: 'postalCode', align: 'left', },
];
if (store.isAdmin) {
  columns.push({
    name: 'Action', label: 'Action', field: 'action',
  })
}
const tableRef = ref()
const rows = ref([])
const originalRows = ref([])
const loading = ref(true)
const filters = ref({
  name: '',
  address: '',
  postalCode: '',
})
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 15
})
function fetchFromServer(startRow, count, sortBy, descending) {
  const data = filters.value
    ? originalRows.value.filter(row => (filters.value.name == '' || row.description.includes(filters.value.name)) && (filters.value.address == '' || row.address.includes(filters.value.address)) && (filters.value.postalCode == '' || row.postalCode.includes(filters.value.postalCode)))
    : originalRows.value.slice()

  // handle sortBy
  if (sortBy) {
    const sortFn = sortBy === 'desc'
      ? (descending
        ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
        : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      )
      : (descending
        ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
        : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
      )
    data.sort(sortFn)
  }

  return data.slice(startRow, startRow + count)
}
function onRequest(props) {

  loading.value = true;
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  // emulate server
  setTimeout(() => {
    // update rowsCount with appropriate value
    //pagination.value.rowsNumber = getRowsNumberCount(filter)

    // get all rows if "All" (0) is selected
    const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage

    // fetch data from "server"
    const returnedData = fetchFromServer(startRow, fetchCount, sortBy, descending)

    // clear out existing data and add new
    rows.value.splice(0, rows.value.length, ...returnedData)

    // don't forget to update local pagination object
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

    // ...and turn of loading indicator
    loading.value = false;
  }, 1500)
}

onMounted(() => {
  originalRows.value = props.addresses
  tableRef.value.requestServerInteraction()
})
</script>
<template>
  <q-btn v-if="store.isAdmin" color="primary" label="Adicionar" :to="`/companies/show/${companyid}/contactaddress/add`" />
  <q-table :loading="loading" @request="onRequest" flat bordered ref="tableRef" title="Treats" :rows="rows"
    :columns="columns" row-key="id" v-model:pagination="pagination" :filter="filters" binary-state-sort>


    <template v-slot:top>
      <q-space />
      <q-input outlined label="Descrição" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-input outlined label="Endereço" borderless dense debounce="300" v-model="filters.address" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-input outlined label="Codigo Postal" borderless dense debounce="300" v-model="filters.postalCode"
        placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

    </template>
    <q-space />


    <template v-slot:body-cell-Action="props">
      <q-td>
        <q-btn :to="`/companies/show/${companyId}/contactaddress/edit/${props.row.id}`" unelevated text-color="secondary">
          <q-icon name="edit"></q-icon>
        </q-btn>
      </q-td>
    </template>

  </q-table>
</template>
