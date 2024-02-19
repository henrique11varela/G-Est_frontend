<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import { useRoute, useRouter } from 'vue-router';

import notify from 'src/composables/notify'
const router = useRouter();
const valueCreated = async function (data) {
  await router.back()
}

</script>

<template>
  <q-page padding>
    <div class="q-ma-lg">
      <h1 class="text-h6">Adicionar Morada</h1>
    </div>
    <CompanyAddressesFrom :edit="false" @valuecreated="valueCreated" />

  </q-page>
</template>
