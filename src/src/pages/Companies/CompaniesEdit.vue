<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import { put, getCompany } from "src/services/fetches/companies.js";
const router = Router();
const route = useRoute();
const id = route.params.id;
const edit = ref(false);
async function EditCompany(obj) {
  try {
    await put(id, obj);
    // $q.notify({
    //   color: 'green-4',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   message: 'Submitted'
    // // })
    await router.push({
      path: "companies"
    });
    await router.go();
  } catch (e) {
    console.log(e)
  }
}
const company = ref(false)
console.log(company.value)
onMounted(async () => {
  try {
    company.value = await getCompany(id);
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})
</script>
<template>
  <span class="text-h5">Editar Companhia</span>
  <CompanyFrom v-if="company" @submit-Company="EditCompany" :-company="company" :edit="edit" />
</template>
