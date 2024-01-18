<template>
  <div class="q-py-md">
    <div>
      <q-input
        style="max-width: 300px;"
        type="search"
        outlined
        bg-color="white"
        borderless dense
        debounce="400"
        v-model="email"
        :loading="loading"
        placeholder="Procurar email institucional"
        @update:model-value="fetchStudent"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-if="student">
        <StudentsInfo class="col-11" :student-info="student"></StudentsInfo>
        <q-btn unelevated label="Associar" color="accent" @click="addStudent"/>
      </div>
    </div>
    <ClassesStudentsList @remove-student="removeStudent" is-edit :students="editList"></ClassesStudentsList>
    <div>
      <q-btn unelevated label="Guardar" color="primary" @click="$emit('submitStudents', editList)"/>
      <q-btn unelevated label="Reset" color="primary" flat class="q-ml-sm" @click="setDefaultList()" />
    </div>
  </div>
</template>

<script setup>
import StudentsInfo from 'src/components/students/StudentsInfo.vue'
import ClassesStudentsList from './ClassesStudentsList.vue'
import studentsAPI from 'src/services/fetches/students'
import { ref, onMounted } from 'vue'

const editList = ref([])
const email = ref("")
const student = ref(null)
const loading = ref(false)

const props = defineProps({
  students: {
    type: Object,
    required: true
  }
})

onMounted(async () => {
  setDefaultList()
})

function setDefaultList() {
  editList.value = [...props.students]
}

function removeStudent(id) {
  const studentIndex = editList.value.findIndex(student => student.id === id)
  if (studentIndex !== -1) editList.value.splice(studentIndex, 1)
}

function addStudent() {
  if (student.value) {
    editList.value.push(student.value)
    student.value = null
  }
}

async function fetchStudent(value) {
  loading.value = true
  const args = { atec_email: value }
  const response = await studentsAPI.index(args)
  console.log(response)
  if (response.data.length === 1) {
    //Validate if student already is in class but not sure if it should be here
    student.value = response.data[0]
  }
  loading.value = false
}
</script>
