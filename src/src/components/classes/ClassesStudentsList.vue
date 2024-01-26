<template>
  <div class="q-py-md">
    <q-table
      card-class="bg-grey-1"
      flat bordered
      :rows="props.students"
      :columns="columns"
      row-key="id"
      hide-no-data
      hide-pagination
      :pagination="{ rowsPerPage:0 }"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" v-if="edit && isAdmin">
          <q-btn unelevated text-color="negative" @click="$emit('removeStudent', props.row.id)">
              <q-icon name="remove"></q-icon>
          </q-btn>
        </q-td>
        <q-td :props="props" v-else>
          <q-btn unelevated text-color="secondary" :to="`/students/edit/${props.row.id}`">
              <q-icon name="edit"></q-icon>
          </q-btn>
          <q-btn unelevated text-color="accent" :to="`/internhips/${classId}/${props.row.id}`">
              <q-icon name="work"></q-icon>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-currentInternship="props">
        <CurrentInternship :table-data="props"></CurrentInternship>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import CurrentInternship from './CurrentInternship.vue';

const props = defineProps({
  students: Object,
  edit: Boolean,
  classId: String
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
    name: 'hardSkills',
    required: true,
    label: 'Hard skills',
    align: 'left',
    field: row => row.hardSkills,
  },
  {
    name: 'softSkills',
    required: true,
    label: 'Soft skills',
    align: 'left',
    field: row => row.softSkills,
  },
  {
    name: 'currentInternship',
    required: true,
    label: 'Estágio atual',
    align: 'left',
  },
  {
    name: 'actions',
    align: 'center',
  }
]
</script>
