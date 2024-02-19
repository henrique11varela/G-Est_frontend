<script setup>
import CompanyPeopleFrom from 'src/components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'
const router = Router();
const valueCreated = async function (data) {
  if (data.requestStatus == 200) {

    await router.back()
  }
}

</script>

<template>
  <q-page padding>

    <div class="q-ma-lg">
      <h1 class="text-h6">Adicionar Contacto</h1>
    </div>
    <CompanyPeopleFrom @valuecreated="valueCreated" />

  </q-page>
</template>
