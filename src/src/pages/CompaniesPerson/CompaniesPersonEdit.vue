<script setup>
import ReturnButton from 'src/components/ReturnButton.vue';
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
const router = Router();
const valueCreated = async function (data) {

  await router.back()
}

</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Contacto</h1>
      <CompanyPeopleFrom :edit="true" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
