<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'
import ReturnButton from 'src/components/ReturnButton.vue';
const router = Router();
const valueCreated = async function (data) {
  if (data.status == 200) {

    await router.back()
  }
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Adicionar Empresa</h1>
      <CompanyFrom :edit="false" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
