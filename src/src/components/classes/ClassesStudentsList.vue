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

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width></q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th class="text-left">Situação Atual</q-th>
          <q-th auto-width></q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="info" unelevated round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <CurrentInternship :internships="props.row.internships"></CurrentInternship>
          <q-td>
            <div v-if="loginStore.isAdmin">
              <q-btn unelevated text-color="negative" @click="$emit('removeStudent', props.row.id)" v-if="edit">
                <q-icon name="remove"></q-icon>
              </q-btn>
              <div v-else>
                <q-btn unelevated text-color="secondary" :to="`/students/edit/${props.row.id}`">
                  <q-icon name="edit"></q-icon>
                </q-btn>
                <q-btn unelevated text-color="accent" :to="`/internships/${classId}/${props.row.id}`">
                  <q-icon name="work"></q-icon>
                </q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
        <q-tr no-hover v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <StudentsContacts
            :contacts="studentContacts(props.row)"></StudentsContacts>
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import CurrentInternship from './CurrentInternship.vue'
import StudentsContacts from '../students/StudentsContacts.vue'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

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
]

function studentContacts(student) {
  if (student) {
    const {
      atecEmail,
      personalEmail,
      phoneNumber,
      address,
      postalCode,
      locality
    } = student

    return {
      atecEmail,
      personalEmail,
      phoneNumber,
      address,
      postalCode,
      locality
    }
  }
}
</script>
