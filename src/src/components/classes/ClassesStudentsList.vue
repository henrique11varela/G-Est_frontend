<template>
  <div class="q-py-md">
    <q-table
      card-class="bg-grey-1"
      flat bordered
      :rows="students"
      :columns="columns"
      row-key="id"
      hide-no-data
      hide-pagination
      :pagination="{ rowsPerPage:0 }"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" v-if="isEdit && isAdmin">
          <q-btn unelevated text-color="negative" @click="$emit('removeStudent', props.row.id)">
              <q-icon name="remove"></q-icon>
          </q-btn>
        </q-td>
        <q-td :props="props" v-else>
          <q-btn unelevated text-color="primary" :to="`/students/show/${props.row.id}`">
              <q-icon name="visibility"></q-icon>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
defineProps({
  students: Object,
  isEdit: Boolean
})

const isAdmin = true

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
