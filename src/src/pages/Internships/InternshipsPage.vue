<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Estágio</h1>
      <InternshipsForm />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
  import ReturnButton from "src/components/ReturnButton.vue";
import InternshipsForm from "../../components/internships/internshipsForm.vue";
</script>

<style scoped>

</style>
