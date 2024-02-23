<template>
  <ClassesImport @imported="updateTable" v-if="loginStore.isAdmin"></ClassesImport>
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
        <q-inner-loading showing>
          <q-spinner
            color="primary"
            size="3em"
            :thickness="2"
            v-if="loading"
          />
        </q-inner-loading>
      </template>

      <template v-slot:top-right>
        <div>
          <q-input outlined bg-color="white" borderless dense debounce="500" v-model="filter" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="primary" :to="`/classes/show/${props.row.id}`">
            <q-icon name="visibility" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import classesAPI from 'src/services/fetches/classes'
import ClassesImport from 'src/components/imports/ClassesImport.vue'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Turmas',
    align: 'left',
    field: row => row.name,
  },
  {
    name: 'course',
    required: true,
    label: 'Curso',
    align: 'left',
    field: row => row.course.name,
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
  const response = await classesAPI.index(params)
  rows.value = response.data
  pagination.value = response.pagination

  loading.value = false
}

function updateTable() {
  tableRef.value.requestServerInteraction()
}

onMounted(() => {
  updateTable()
})
</script>
