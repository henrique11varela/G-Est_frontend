<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-gutter-md no-wrap">
        <div>
          <h1 class="text-h6">Cursos</h1>
        </div>
        <q-btn dense unelevated color="primary" icon="add" :to="'courses/add'" v-if='loginStore.isAdmin'/>
      </div>
      <CoursesList></CoursesList>
    </div>
  </q-page>
</template>

<script setup>
import CoursesList from '../../components/courses/CoursesList.vue'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()
</script>
