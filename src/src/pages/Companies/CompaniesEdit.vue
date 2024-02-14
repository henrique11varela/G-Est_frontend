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
    <div class="q-pa-md">
      <span class="text-h5">Editar empresa</span>
      <CompanyFrom :edit="true" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
