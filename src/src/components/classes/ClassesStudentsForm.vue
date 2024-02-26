<template>
  <div class="q-py-md">
    <div>
      <q-input
        style="max-width: 400px;"
        type="search"
        outlined
        bg-color="white"
        borderless dense
        debounce="500"
        v-model="filter"
        :loading="loading"
        placeholder="Procurar formando"
        @update:model-value="fetchStudent"
        v-if="loginStore.isAdmin"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="q-py-md" v-if="filteredStudents.length > 0">
        <AssociateStudentsInfo
          v-for="(student, index) in filteredStudents"
          :key="index"
          :student="student"
          :associate="!isStudentDuplicate(student)"
          @studentPicked="addStudent"
        >
        </AssociateStudentsInfo>
      </div>
    </div>
    <ClassesStudentsList @remove-student="removeStudent" edit :students="editList"></ClassesStudentsList>
    <div v-if="loginStore.isAdmin">
      <q-btn unelevated label="Guardar" color="primary" @click="$emit('submitStudents', editList)"/>
      <q-btn unelevated label="Reset" color="primary" flat class="q-ml-sm" @click="setDefaultList()"/>
    </div>
  </div>
</template>

<script setup>
import AssociateStudentsInfo from 'src/components/students/AssociateStudentsInfo.vue'
import ClassesStudentsList from './ClassesStudentsList.vue'
import studentsAPI from 'src/services/fetches/students'
import { ref, onMounted } from 'vue'
import { useLoginStore } from 'src/stores/login'
import { useErrorHandling } from 'src/composables/useErrorHandling'

const { isValid, checkResponseErrors } = useErrorHandling()
const loginStore = useLoginStore()

const editList = ref([])
const filter = ref("")
const filteredStudents = ref([])
const loading = ref(false)

const props = defineProps({
  students: {
    type: Array,
    required: true,
    default() {
      return []
    },
  }
})

onMounted(async () => {
  setDefaultList()
})

function isStudentDuplicate(student) {
  if (!student) return false
  return editList.value.some((item) => item.id === student.id)
}

function setDefaultList() {
  editList.value = [...props.students]
}

function removeStudent(id) {
  const studentIndex = editList.value.findIndex(student => student.id === id)
  if (studentIndex !== -1) editList.value.splice(studentIndex, 1)
}

function addStudent(student) {
  if (student) editList.value.push(student)
}

async function fetchStudent(value) {
  if (!value) return
  loading.value = true
  const args = { name: value, atec_email: value }
  const response = await studentsAPI.index(args)
  checkResponseErrors(response)
  if (isValid) filteredStudents.value = response.data
  loading.value = false
}
</script>
