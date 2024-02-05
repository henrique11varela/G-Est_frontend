<script setup>
import CompanyInfo from '../../components/companies/CompanyInfo.vue'
import CompanyPeopleList from '../../components/companiesPeople/CompanyPeopleList.vue'
import CompanyAddressesList from '../../components/companyAddressesList/CompanyAddressesList.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import companiesAPI from "src/services/fetches/companies.js";
import {
  Loading,

  QSpinnerGears
} from 'quasar'
const route = useRoute();
const id = route.params.id;
const edit = ref(false);

const company = ref(false)
const people = ref(false)
const addresses = ref(false)

// default options
Loading.show()
onMounted(async () => {
  try {
    const data = await companiesAPI.show(id);
    company.value = data.company;
    people.value = data.company.peoples;
    addresses.value = data.company.addresses;

    Loading.hide()
  } catch ($e) {
  }
})
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">

      <q-btn unelevated color="primary" :to="`/companies/edit/${id}`" :icon="matEdit" label="Edit" />
      <h1 class="text-h6">Empresa {{ company.name }}</h1>

      <CompanyInfo v-if="company" :company="company" :edit="edit" />
      <CompanyPeopleList v-if="people" :people="people" :companyid="id" />
      <CompanyAddressesList v-if="addresses" :addresses="addresses" :companyid="id" />
    </div>
  </q-page>
</template>
