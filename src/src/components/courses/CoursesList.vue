<template>
  <div class="q-py-md">
    <q-table
      color="primary"
      card-class="bg-grey-1"
      flat bordered
      ref="tableRef"
      :rows="rows"
      :columns="columns"
      :row-key="row => row?.id"
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
          <q-input outlined bg-color="white" borderless dense debounce="600" v-model="filter" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="secondary" icon="edit" :to="`/courses/edit/${props.row.id}`" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import coursesAPI from 'src/services/fetches/courses'
import { useLoginStore } from 'src/stores/login'
import { useErrorHandling } from 'src/composables/useErrorHandling'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Curso',
    align: 'left',
    field: row => row?.name,
  },
  {
    name: 'type',
    required: true,
    label: 'Tipo',
    align: 'left',
    field: row => row?.type,
  },
  {
    name: 'area',
    required: true,
    label: 'Área',
    align: 'left',
    field: row => `${row?.area?.areaCode} - ${row?.area?.name}`,
  },
]

const { isValid, checkResponseErrors } = useErrorHandling()
const loginStore = useLoginStore()

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
  const params = { page, quantity: rowsPerPage, name: filter }

  loading.value = true
  const response = await coursesAPI.index(params)
  checkResponseErrors(response)
  if (isValid.value) {
    rows.value = response.data
    pagination.value = response.pagination
  }
  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
  if (loginStore.isAdmin) columns.push({
    name: 'actions',
    align: 'center',
  })
})
</script>
