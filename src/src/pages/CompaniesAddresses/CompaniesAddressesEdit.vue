<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'

const router = Router();

const valueCreated = function (data) {
  if (data.requestStatus == 200) {
    notify.store()
    router.back()
  }
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyAddressesFrom :edit="true" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
