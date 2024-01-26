<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import companiesAPI from "src/services/fetches/companies.js";
const router = Router();
const route = useRoute();
const id = route.params.id;
const edit = ref(true);
const company = ref(false)
onMounted(async () => {
  try {
    const data = await companiesAPI.show(id);
    company.value = data.company;
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})
</script>
<template>
  <span class="text-h5">Editar empresa</span>
  <CompanyFrom v-if="company" :company="company" :edit="edit" />
</template>
