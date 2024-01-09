<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import { post } from "src/services/fetches/companies.js";
const q = useQuasar()
async function addCompany(obj) {
  try {
    await post(obj)
    q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  } catch (e) {
    console.log(e)
  }
}
</script>
<template>
  <CompanyFrom @submit-Company="addCompany" />
</template>
