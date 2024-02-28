<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'
import ReturnButton from 'src/components/ReturnButton.vue';

const router = Router();

const valueCreated = function (data) {
  if (data.requestStatus == 200) {

    router.back()
  }
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Morada</h1>
      <CompanyAddressesFrom :edit="true" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
