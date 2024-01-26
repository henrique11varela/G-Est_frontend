<script setup>
import { onMounted, ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  addresses: Array,
  companyid: Number,
})
const emit = defineEmits(['request'])
const columns = [
  { name: 'description', label: 'Description', field: 'description', },
  { name: 'address', label: 'Address', field: 'address', },
  { name: 'postalCode', label: 'Postal Code', field: 'postalCode', },
  { name: 'Action', label: 'Action', field: 'action', }
];
const tableRef = ref()
const rows = ref([])
const filters = ref({
  name: '',
  phoneNumber: '',
  isContact: '',
  isTutor: '',
})
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 15
})
const companyId = props.companyid;

onMounted(() => {
  rows.value = props.addresses
})
</script>
<template>

  <q-btn color="primary" :disable="loading" label="Adicionar" :to="`/companies/show/${companyId}/contactaddress/add`" />
  <q-table flat bordered ref="tableRef" title="Treats" :rows="rows" :columns="columns" row-key="id"
    v-model:pagination="pagination"  :filter="filters" binary-state-sort>


    <template v-slot:top>
      <q-space />
      <q-input label="Name" borderless dense debounce="300" v-model="filters.name" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-space />
      <q-input label="Address" borderless dense debounce="300" v-model="filters.phoneNumber" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space />

    </template>
    <q-space />
    <template v-slot:top-right>
      <q-input outlined bg-color="white" borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>


    <template v-slot:body-cell-Action="props">
      <q-td>
        <q-btn :to="`/companies/show/${companyId}/contactaddress/edit/${props.row.id}`" unelevated text-color="secondary">
          <q-icon name="edit"></q-icon>
        </q-btn>
      </q-td>
    </template>

  </q-table>
</template>
