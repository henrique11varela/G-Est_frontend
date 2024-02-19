<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'

const router = Router();

const valueCreated = function (data) {
  if (data.requestStatus == 200) {

    router.back()
  }
}
</script>
<template>
  <q-page padding>

    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Morada</h1>
    </div>
      <CompanyAddressesFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
