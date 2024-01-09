<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import { put, getCompany } from "src/services/fetches/companies.js";
const router = Router();
const route = useRoute();
const id = route.params.id;
async function EditCompany(obj) {
  try {
    await put(id, obj);
    // $q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message: 'Submitted'
    // // })
    router.push({
      path:"companies"
    });
    router.go();
  } catch (e) {
    console.log(e)
  }
}
const company = ref(false)
console.log(company.value)
onMounted(async () => {
  company.value = await getCompany(id);
})
</script>
<template>
  <h1>Editar Companhia</h1>
  <CompanyFrom v-if="company" @submit-Company="EditCompany"
  :-company="company"

  />
</template>
