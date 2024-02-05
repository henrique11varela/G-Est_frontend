<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import companiesAPI from "src/services/fetches/companies.js";
import { Loading, QSpinnerGears } from 'quasar';
const router = Router();
const route = useRoute();
const id = route.params.id;
const edit = ref(true);
const company = ref(false);
Loading.show()
onMounted(async () => {
  try {
    const data = await companiesAPI.show(id);
    company.value = data.company;
    Loading.hide()
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <span class="text-h5">Editar empresa</span>
      <CompanyFrom v-if="company" :company="company" :edit="edit" />
    </div>
  </q-page>
</template>
