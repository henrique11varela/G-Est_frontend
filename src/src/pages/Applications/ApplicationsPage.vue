<template>
  <q-page padding>
      <h1 class="text-h6">Solicitações</h1>
      <q-btn color="primary" label="Criar Solicitação" :to="'applications/add'" />
      <ListAplications />
  </q-page>
</template>

<script>
import ListAplications from 'src/components/Apllications/AplicationsList.vue';

  export default {
    components: {
      ListAplications,
    },
  }
</script>

<style lang="scss" scoped>

</style>
