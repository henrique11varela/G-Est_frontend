<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Formandos</h1>
      <q-btn unelevated color="primary" icon="add" label="Adicionar" :to="'students/add'" />
      <StudentsList></StudentsList>
    </div>
  </q-page>
</template>

<script setup>
import StudentsList from 'src/components/students/StudentsList.vue'
</script>
