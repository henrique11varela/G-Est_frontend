<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Criar formando</h1>
      <StudentsForm @student-submit="createStudent"></StudentsForm>
    </div>
  </q-page>
</template>

<script setup>
import StudentsForm from 'src/components/students/StudentsForm.vue'
import studentsAPI from 'src/services/fetches/students'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

async function createStudent(student) {
  const response = await studentsAPI.store(student)
  console.log(response)
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Criado'
  })
  router.push('/students')
}

</script>
