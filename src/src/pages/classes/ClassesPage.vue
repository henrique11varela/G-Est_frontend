<template>
  <q-page padding>
    <!-- content -->
    <h1 class="text-h6">Turmas</h1>
    <q-btn color="primary" label="Adicionar" :to="'classes/add'" />
    <ClassesList></ClassesList>
  </q-page>
</template>

<script setup>
import ClassesList from '../../components/classes/ClassesList.vue'
</script>
