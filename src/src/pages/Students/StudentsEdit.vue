<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar aluno</h1>
        <div v-if="loginStore.isAdmin">
          <q-btn unelevated color="negative" label="Apagar" @click="deleteStudent"/>
        </div>
      </div>
      <StudentsForm edit @valuecreated="postSubmit"></StudentsForm>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import StudentsForm from 'src/components/students/StudentsForm.vue'
import studentsAPI from 'src/services/fetches/students'
import { useRoute, useRouter } from 'vue-router'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
import ReturnButton from 'src/components/ReturnButton.vue'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

function postSubmit(value) {
  router.back()
}

function deleteStudent() {
  deleteModel(studentsAPI.destroy, route.params.id, router, 'o formando', '/students')
}
</script>
