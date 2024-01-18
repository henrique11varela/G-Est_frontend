<template>
  <q-page padding>
    <div v-if="loading">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="2"
      />
    </div>
    <div class="q-pa-md" v-else>
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar formando</h1>
        <div v-if="isAdmin">
          <q-btn unelevated color="negative" icon="delete" label="Apagar" @click="confirmDelete"/>
        </div>
      </div>
      <StudentsForm @student-submit="editStudent"
        :default-name="student.name"
        :default-atec-email="student.atecEmail"
        :default-personal-email="student.personalEmail"
        :default-phone-number="student.phoneNumber"
      ></StudentsForm>
    </div>
  </q-page>
</template>

<script setup>
import StudentsForm from 'src/components/students/StudentsForm.vue'
import studentsAPI from 'src/services/fetches/students'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'


const student = ref({})
const loading = ref(true)
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const isAdmin = true

watch(
  () => route.params.id,
  async newId => {
    getStudent(newId)
  }
)

onMounted(() => {
  getStudent(route.params.id)
})

async function getStudent(id) {
  loading.value = true
  const response = await studentsAPI.show(id)
  student.value = response
  loading.value = false
}

async function editStudent(editedStudent) {
  const id = route.params.id
  editedStudent.id = id
  const response = await studentsAPI.update(editedStudent)
  $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Editado'
  })
  router.push(`/students/show/${id}`)
}

async function deleteStudent() {
  const response = await studentsAPI.destroy(route.params.id)
  console.log(response)
  $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Apagado'
  })
  router.push('/students')
}

function confirmDelete () {
  $q.dialog({
    title: 'Apagar',
    message: 'Tem a certeza que pretende apagar o formando?',
    cancel: true
  }).onOk(() => {
    deleteStudent()
  })
}
</script>
