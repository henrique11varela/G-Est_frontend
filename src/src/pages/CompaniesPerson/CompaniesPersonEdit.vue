<script setup>
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
const router = Router();
const valueCreated = async function (data) {

  await router.back()
}

</script>
<template>
  <q-page padding>
    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Contacto</h1>
    </div>
      <CompanyPeopleFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
