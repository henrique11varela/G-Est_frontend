<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar curso</h1>
        <div v-if="loginStore.isAdmin">
          <q-btn unelevated color="negative" label="Apagar" @click="deleteCourse"/>
        </div>
      </div>
      <CoursesForm edit @valuecreated="postSubmit"></CoursesForm>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import CoursesForm from 'src/components/courses/CoursesForm.vue'
import coursesAPI from 'src/services/fetches/courses'
import { useRoute, useRouter } from 'vue-router'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
import ReturnButton from 'src/components/ReturnButton.vue'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

function postSubmit(value) {
  router.push('/courses')
}

function deleteCourse() {
  deleteModel(coursesAPI.destroy, route.params.id, router, 'o curso', '/courses')
}
</script>
