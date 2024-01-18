<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import Router from 'src/router/index.js';
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import { post } from "src/services/fetches/companies.js";
const $q = useQuasar()
const router = Router();
const edit = ref(true)
async function addCompany(obj) {
  try {
    await post(obj)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    router.push('companies')
    router.go()
  } catch (e) {
    console.log(e)
  }
}
</script>
<template>
  <span class="text-h5">Adicionar empresa</span>
  <CompanyFrom  :edit="edit" @submit-Company="addCompany" />
</template>
