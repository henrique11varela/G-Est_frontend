<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import { useRoute, useRouter } from 'vue-router';

import notify from 'src/composables/notify'
const router = useRouter();
const valueCreated = async function (data) {
  if (data.requestStatus == 200) {
    notify.store()
    await router.back()
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyAddressesFrom :edit="false" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
