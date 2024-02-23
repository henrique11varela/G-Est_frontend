<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Cursos</h1>
      <q-btn unelevated color="primary" label="Adicionar" :to="'courses/add'" v-if="loginStore.isAdmin"/>
      <CoursesList></CoursesList>
    </div>
  </q-page>
</template>

<script setup>
import CoursesList from '../../components/courses/CoursesList.vue'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()
</script>
