<template>
  <div class="q-pa-md">
    <q-table
      card-class="bg-grey-1"
      flat bordered
      :rows="selectedClass.students"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :pagination="{ rowsPerPage: 0 }"
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
          <q-btn unelevated :icon="matVisibility" text-color="primary"></q-btn>
          <q-btn unelevated :icon="matEdit" text-color="secondary"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { matVisibility } from '@quasar/extras/material-icons'
import { matEdit } from '@quasar/extras/material-icons'

const filter = ref("")

defineProps({
  selectedClass: Object
})

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
    label: 'Email ATEC',
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
</script>
