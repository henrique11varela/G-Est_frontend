<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import Router from 'src/router';
import notify from 'src/composables/notify'
const router = Router();
const valueCreated = async function (data) {
  if (data.status == 200) {

    await router.back()
  }
}
</script>
<template>
  <q-page padding>

    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Empresa</h1>
    </div>
    <CompanyFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
