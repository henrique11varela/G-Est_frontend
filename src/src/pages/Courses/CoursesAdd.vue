<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Criar curso</h1>
      <CoursesForm @valuecreated="postSubmit"></CoursesForm>
    </div>
  </q-page>
</template>

<script setup>
import CoursesForm from 'src/components/courses/CoursesForm.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function postSubmit(value) {
  router.push('/courses')
}

</script>
