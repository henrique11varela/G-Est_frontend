<template>
  <q-page padding>
      <h1 class="text-h6">Editar Solicitação</h1>
      <ApllicationsForm />
      <q-btn type="submit" label="Voltar" color="primary" to="/applications"/>
      <q-btn type="submit" label="Gravar Alterações" color="primary" />
  </q-page>
</template>

<script>
import ApllicationsForm from 'src/components/Applications/ApplicationsForm.vue';

  export default {
    components: {
      ApllicationsForm,
    },
  }

</script>

<style lang="scss" scoped>

</style>
