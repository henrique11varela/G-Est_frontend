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
          <q-input outlined bg-color="white" borderless dense debounce="500" v-model="filter" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated :to="`/applications/edit/${props.row?.id}`">
            <q-icon v-if="LoginStore.isAdmin" name="edit" color="secondary"/>
            <q-icon v-else name="visibility" color="primary"/>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import applicationsAPI from 'src/services/fetches/applications'
import { useLoginStore } from 'src/stores/login';
import { LocalStorage } from 'quasar';

const LoginStore = useLoginStore()

const columns = [
{
    name: "company_name",
    required: true,
    label: "Nome da Empresa",
    align: "left",
    field: row => row.companyName,
  },
  {
    name: "partner",
    required: true,
    label: "Parceiro?",
    align: "left",
    field: row => row.isPartner,
    format: val => (val ? "Sim" : "Não"),
  },
  {
    name: "locality",
    required: true,
    label: "Localidade",
    align: "left",
    field: row => row.locality,
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

  const params = { page, quantity: rowsPerPage, company_name: filter }
  const response = await applicationsAPI.index(params)
  rows.value = response.data
  pagination.value = response.pagination

  loading.value = false
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>
