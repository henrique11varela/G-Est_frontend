<template>
  <div class="q-pa-md">
    <q-table
      card-class="bg-grey-1"
      flat bordered
      :rows="selectedClass.students"
      :columns="columns"
      row-key="id"
      hide-no-data
      hide-pagination
      :pagination="{rowsPerPage:0}"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated :icon="isEdit ? matRemove: matVisibility" :text-color="isEdit ? 'negative': 'primary'"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { matVisibility, matRemove } from '@quasar/extras/material-icons'

defineProps({
  selectedClass: Object,
  isEdit: Boolean
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
