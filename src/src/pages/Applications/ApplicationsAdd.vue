<template>
  <q-page padding>
      <h1 class="text-h6">Adicionar Solicitação</h1>
      <ApllicationsForm />
      <q-btn type="submit" label="Voltar" color="primary" to="/applications"/>
      <q-btn type="submit" label="Adicionar" color="primary" />
  </q-page>
</template>

<script>
import ApllicationsForm from 'src/components/Apllications/ApllicationsForm.vue';

  export default {
    components: {
      ApllicationsForm,
    },
  }

</script>

<style lang="scss" scoped>
</style>
