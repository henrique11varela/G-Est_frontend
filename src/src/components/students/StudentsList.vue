<template>
  <div class="q-py-md">
    <q-table
      color="primary"
      card-class="bg-grey-1"
      flat bordered
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      hide-no-data
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50, 100]"
      rows-per-page-label="Registos por página"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <div>
          <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="primary" :to="`students/show/${props.row.id}`">
            <q-icon name="visibility"></q-icon>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import studentsAPI from 'src/services/fetches/students'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: row => row.name,
  },
  {
    name: 'atecEmail',
    required: true,
    label: 'Email institucional',
    align: 'left',
    field: row => row.atecEmail,
  },
  {
    name: 'personalEmail',
    required: true,
    label: 'Email pessoal',
    align: 'left',
    field: row => row.personalEmail,
  },
  {
    name: 'phoneNumber',
    required: true,
    label: 'Telefone',
    align: 'left',
    field: row => row.phoneNumber,
  },
  {
    name: 'actions',
    align: 'center',
  }
]

const tableRef = ref()
const rows = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 0
})

async function onRequest (props) {
  const { page, rowsPerPage } = props.pagination
  const filter = props.filter

  loading.value = true

  const params = { page, quantity: rowsPerPage, name: filter }
  const response = await studentsAPI.index(params)
  rows.value = response.data
  pagination.value = response.pagination

  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>
