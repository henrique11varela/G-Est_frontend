<script setup>
import { onMounted, ref, defineEmits, defineProps } from 'vue';
import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
const props = defineProps({
  people: Array,
  companyid: Number
})
const emit = defineEmits(['request'])
const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left', },
  { name: 'phoneNumber', label: 'Número de Telefone', field: 'phoneNumber', align: 'left', },
  { name: 'email', label: 'Email', field: 'email', align: 'left', },
  { name: 'isContact', label: 'Contacto', field: 'isContact', align: 'left', },
  { name: 'isTutor', label: 'Tutor', field: 'isTutor', align: 'left', },
];
if (store.isAdmin) {
  columns.push({
    name: 'Action', label: '', field: 'action', align: 'center',
  })
}
const tableRef = ref()
const rows = ref([])
const originalRows = ref([])
const loading = ref(false);
const filters = ref({
  name: '',
  phoneNumber: '',
  email: '',
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
    ? originalRows.value.filter(row => (filters.value.name == '' || row.name.includes(filters.value.name)) && (filters.value.phoneNumber == '' || row.phoneNumber.includes(filters.value.phoneNumber)) && (filters.value.email == '' || row.email.includes(filters.value.email)))
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
    pagination.value.rowsNumber = returnedData.length
    // ...and turn of loading indicator
    loading.value = false;
  }, 0)
}

onMounted(() => {
  originalRows.value = props.people
  tableRef.value.requestServerInteraction()
})
</script>
<template>
  <div class="row items-center q-gutter-md no-wrap">
    <div>
      <h1 class="text-h6">Lista de Contactos e Tutores</h1>
    </div>
    <q-btn dense unelevated color="primary" icon="add" :to="`/companies/show/${companyid}/companiesperson/add`" />
  </div>
  <q-table :loading="loading" @request="onRequest" flat bordered ref="tableRef" title="Treats" :rows="rows"
    :columns="columns" row-key="id" v-model:pagination="pagination" :filter="filters" binary-state-sort :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]"
      rows-per-page-label="Registos por página" hide-no-data>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

    <template v-slot:top>
      <q-space />
      <q-input class="q-ma-md" outlined label="Nome" borderless dense debounce="300" v-model="filters.name" placeholder="Procurar">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-input class="q-ma-md"  outlined label="Numero de Telefone" borderless dense debounce="300" v-model="filters.phoneNumber"
        placeholder="Procurar">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-input class="q-ml-md" outlined label="Email" borderless dense debounce="300" v-model="filters.email" placeholder="Procurar">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

    </template>


    <template v-slot:body-cell-isTutor="props">
      <q-td>
        <q-icon v-if="props?.row?.isTutor" name="done" />
      </q-td>
    </template>


    <template v-slot:body-cell-isContact="props">
      <q-td>
        <q-icon v-if="props?.row?.isContact" name="done" />
      </q-td>
    </template>
    <template v-slot:body-cell-Action="props">
      <q-td  class="text-center">
        <q-btn :to="`/companies/show/${companyid}/companiesperson/edit/${props?.row?.id}`" unelevated text-color="secondary">
          <q-icon name="edit"></q-icon>
        </q-btn>
      </q-td>
    </template>

  </q-table>
</template>
