<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import Router from 'src/router/index.js';
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import { post } from "src/services/fetches/companies.js";
const q = useQuasar()
const router = Router();
async function addCompany(obj) {
  try {
    await post(obj)
    // q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message: 'Submitted'
    // })
    router.push('companies')
    router.go()
  } catch (e) {
    console.log(e)
  }
}
</script>
<template>
  <h1>Adicionar Companhia</h1>
  <CompanyFrom @submit-Company="addCompany" />
</template>
