<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'

import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { put, getCompany } from "src/services/fetches/companies.js";
const q = useQuasar();
const route = useRoute();
const id = route.params.id;
async function EditCompany(obj) {
  try {
    await put(id, obj)
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
const user = ref({
  name: String,
  email: String,
})
console.log(company.value)
onMounted(async () => {
  company.value = await getCompany(id);
})
</script>
<template>
  <CompanyFrom @submit-Company="EditCompany"
    :name="user.name"
    :nipc="user.email"/>
</template>
