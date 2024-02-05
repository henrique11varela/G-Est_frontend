<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import { useRoute, useRouter } from 'vue-router';

import notify from 'src/composables/notify'
const router = useRouter()
const route = useRoute()
const id = route.params.id;
const address = {
  companyId: id,
  description: '',
  address: '',
  postalCode: '',
}
const valueCreated = async function (data) {
  if (data.status == 200) {
    notify.store()
    await router.back()
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyAddressesFrom :address="address" :edit="false" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
