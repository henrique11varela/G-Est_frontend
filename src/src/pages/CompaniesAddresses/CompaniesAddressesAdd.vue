<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import { useRoute, useRouter } from 'vue-router';

import notify from 'src/composables/notify'
import ReturnButton from 'src/components/ReturnButton.vue';
const router = useRouter();
const valueCreated = async function (data) {
  await router.back()
}

</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Adicionar Morada</h1>
      <CompanyAddressesFrom :edit="false" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
