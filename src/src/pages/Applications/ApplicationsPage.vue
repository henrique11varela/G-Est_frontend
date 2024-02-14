<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Solicitações</h1>
      <q-btn color="primary" label="Adicionar" :to="'applications/add'"/>
      <ListAplications />
    </div>
  </q-page>
</template>

<script setup>
import ListAplications from "src/components/Applications/ApplicationsList.vue";
</script>
