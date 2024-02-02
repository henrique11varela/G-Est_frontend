<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Cursos</h1>
      <q-btn unelevated color="primary" icon="add" label="Adicionar" :to="'courses/add'" />
      <CoursesList></CoursesList>
    </div>
  </q-page>
</template>

<script setup>
import CoursesList from '../../components/courses/CoursesList.vue'
</script>
