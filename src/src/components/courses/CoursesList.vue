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
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      hide-no-data
      hide-pagination
      :pagination="{ rowsPerPage:0 }"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right>
        <div>
          <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated text-color="secondary" :to="`/courses/edit/${props.row.id}`">
            <q-icon name="edit" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import coursesAPI from 'src/services/fetches/courses'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Curso',
    align: 'left',
    field: row => row.name,
  },
  {
    name: 'type',
    required: true,
    label: 'Tipo',
    align: 'left',
    field: row => row.type,
  },
  {
    name: 'area',
    required: true,
    label: 'Área',
    align: 'left',
    field: row => `${row.area.areaCode} - ${row.area.name}`,
  },
  {
    name: 'hourlyLoad',
    required: true,
    label: 'Carga horária',
    align: 'left',
    field: row => row.hourlyLoad,
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

async function onRequest (props) {
  const filter = props.filter
  const params = { name: filter }
  loading.value = true
  const response = await coursesAPI.index(params)
  //validations go here
  rows.value = response
  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>
