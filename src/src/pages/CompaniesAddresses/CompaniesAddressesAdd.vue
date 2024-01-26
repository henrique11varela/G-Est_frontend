<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import companyAddressAPI from "src/services/fetches/companyaddress.js";
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const address = {
  companyId: id,
  description: '',
  address: '',
  postalCode: '',
}


</script>

<template>
  <q-page>
    <CompanyAddressesFrom :address="address" :edit="false"/>
  </q-page>
</template>
