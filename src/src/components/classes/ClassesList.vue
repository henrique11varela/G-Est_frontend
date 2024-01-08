<template>
  <div class="q-pa-md fit-content">
    <q-table
      color="primary"
      :selected-rows-label="()=>''"
      card-class="bg-grey-1"
      flat bordered
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="single"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      @update:selected="$emit('classSelected', selected[0] ? selected[0] : null)"
      hide-header
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated :icon="matEdit" text-color="secondary"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
.fit-content {
  width: fit-content;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { matEdit } from '@quasar/extras/material-icons'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Turmas',
    align: 'left',
    field: row => row.name,
  },
  {
    name: 'actions',
    align: 'center',
  }
]

const students = [
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
  {name: 'Maria Manuela Marmelada Melão', personalEmail: "email123@email.com", atecEmail: "maria.manuelat0123123@edu.atec.pt", phoneNumber: '999999999'},
]


const originalRows = [
  { id: 1, name: 'TPSI0622', startDate: '30-06-2022' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 2, name: 'TPSI0522', startDate: '30-05-2022' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 3, name: 'TPSI0623', startDate: '30-06-2023' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 4, name: 'TPSI0620', startDate: '30-06-2020' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 5, name: 'TPSI0222', startDate: '30-02-2022' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 6, name: 'TPSI0322', startDate: '30-03-2022' , course: 'Tecnico Programacao Sistemas Informacao', students},
  { id: 7, name: 'TPSI0624', startDate: '30-06-2024' , course: 'Tecnico Programacao Sistemas Informacao', students},
]

const selected = ref([])
const tableRef = ref()
const rows = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10
})

// emulate ajax call
// SELECT * FROM ... WHERE...LIMIT...
function fetchFromServer (startRow, count, filter, sortBy, descending) {
  const data = filter
    ? originalRows.filter(row => row.name.includes(filter))
    : originalRows.slice()

  // handle sortBy
  if (sortBy) {
    const sortFn = sortBy === 'desc'
      ? (descending
          ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
          : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        )
      : (descending
          ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
          : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
        )
    data.sort(sortFn)
  }

  return data.slice(startRow, startRow + count)
}

// emulate 'SELECT count(*) FROM ...WHERE...'
function getRowsNumberCount (filter) {
  if (!filter) {
    return originalRows.length
  }
  let count = 0
  originalRows.forEach(treat => {
    if (treat.name.includes(filter)) {
      ++count
    }
  })
  return count
}

function onRequest (props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  loading.value = true

  // emulate server
  setTimeout(() => {
    // update rowsCount with appropriate value
    pagination.value.rowsNumber = getRowsNumberCount(filter)

    // get all rows if "All" (0) is selected
    const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage

    // fetch data from "server"
    const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

    // clear out existing data and add new
    rows.value.splice(0, rows.value.length, ...returnedData)

    // don't forget to update local pagination object
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

    // ...and turn of loading indicator
    loading.value = false
  }, 1500)
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction()
})
</script>



