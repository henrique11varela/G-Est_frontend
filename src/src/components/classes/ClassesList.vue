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
      @update:selected="$emit('classSelected', selected[0] ? selected[0] : {})"
      hide-header
      hide-no-data
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top>
        <div>
          <q-btn color="primary" :disable="loading" label="Adicionar" :to="'classes/add'" />
          <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
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
import classesAPI from 'src/services/fetches/classes'
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

const selected = ref([])
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
  tableRef.value.clearSelection()

  loading.value = true

  const response = await classesAPI.index({page, rowsPerPage, filter})
  rows.value = response.data
  pagination.value.page = response.pagination.currentPage
  pagination.value.rowsPerPage = response.pagination.perPage
  pagination.value.rowsNumber = response.pagination.total

  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>



src/services/fetches/classes
