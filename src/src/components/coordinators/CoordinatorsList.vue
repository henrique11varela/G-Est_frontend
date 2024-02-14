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
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <div>
          <q-input outlined bg-color="white" borderless dense debounce="500" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="secondary" :to="`/coordinators/${props.row.id}`">
            <q-icon name="edit" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import coordinatorsAPI from 'src/services/fetches/coordinators'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Coordenador',
    align: 'left',
    field: row => row.name,
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: row => row.emailAtec,
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
  const response = await coordinatorsAPI.index(params)
  console.log(response)
  rows.value = response.data
  pagination.value = response.pagination

  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>
