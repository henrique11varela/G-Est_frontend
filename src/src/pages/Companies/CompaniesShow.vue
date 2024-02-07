<script setup>
import CompanyInfo from '../../components/companies/CompanyInfo.vue'
import CompanyPeopleList from '../../components/companiesPeople/CompanyPeopleList.vue'
import CompanyAddressesList from '../../components/companyAddressesList/CompanyAddressesList.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import companiesAPI from "src/services/fetches/companies.js";
import { useLoginStore } from "src/stores/login.js";

const store = useLoginStore()
import {
  Loading,

  QSpinnerGears
} from 'quasar'
const route = useRoute();
const id =  ref(route.params.id);
const company = ref(false)
const people = ref(false)
const addresses = ref(false)
const load = ref(false);
// default options
onMounted(async () => {
Loading.show()

  try {
    const data = await companiesAPI.show(id.value);
    company.value = data;
    people.value = data.peoples;
    addresses.value = data.addresses;
    load.value = true;
  } catch ($e) {
  }
    Loading.hide()
})
</script>
<template>
  <q-page padding>
    <div class="q-pa-md" v-if="load">

      <q-btn v-if="store.isAdmin" unelevated color="primary" :to="`/companies/edit/${id}`" :icon="matEdit" label="Edit" />
      <h1 class="text-h6">Empresa {{ company.name }}</h1>

      <CompanyInfo  :company="company" />
      <CompanyPeopleList :people="people" :companyid="id" />
      <CompanyAddressesList :addresses="addresses" :companyid="id" />
    </div>
  </q-page>
</template>
