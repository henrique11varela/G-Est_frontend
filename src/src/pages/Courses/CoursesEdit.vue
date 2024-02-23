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
    </div>
  </q-page>
</template>

<script setup>
import CoursesForm from 'src/components/courses/CoursesForm.vue'
import coursesAPI from 'src/services/fetches/courses'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

const isAdmin = true

function postSubmit(value) {
  notify.update()
  router.push('/courses')
}

function deleteCourse() {
  deleteModel(coursesAPI.destroy, route.params.id, router, 'o curso', '/courses')
}
</script>
