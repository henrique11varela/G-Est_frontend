<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import CompanyPeopleList from '../../components/companiesPeople/CompanyPeopleList.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import companiesAPI from "src/services/fetches/companies.js";
const router = Router();
const route = useRoute();
const id = route.params.id;
const edit = ref(false);
async function EditCompany(obj) {
  try {
    await companiesAPI.update(id, obj);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    await router.push({
      path: "companies"
    });
    await router.go();
  } catch (e) {
    console.log(e)
  }
}
const company = ref(false)
const people = ref(false)
onMounted(async () => {
  try {
    const data = await companiesAPI.show(id);
    company.value = data.company;
    people.value = data.contactPeople;
  } catch ($e) {
    // await router.push({ path: 'companies' });
    // await router.go();
  }
})
</script>
<template>
  <q-page>
    <span class="text-h5">Ver Empresa</span>
    <CompanyFrom v-if="company" @submit-Company="EditCompany" :company="company" :edit="edit" />
    <CompanyPeopleList v-if="people" :people="people" />
  </q-page>
</template>
