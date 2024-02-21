<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Coordenadores</h1>
      <q-btn unelevated color="primary" label="Adicionar" :to="'/coordinators/add'" />
      <CoordinatorsList></CoordinatorsList>
    </div>
  </q-page>
</template>

<script setup>
import CoordinatorsList from '../../components/coordinators/CoordinatorsList.vue'
</script>
