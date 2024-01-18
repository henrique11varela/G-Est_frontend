<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Turmas</h1>
      <q-btn unelevated color="primary" icon="add" label="Adicionar" :to="'classes/add'" />
      <ClassesList></ClassesList>
    </div>
  </q-page>
</template>

<script setup>
import ClassesList from '../../components/classes/ClassesList.vue'
</script>
