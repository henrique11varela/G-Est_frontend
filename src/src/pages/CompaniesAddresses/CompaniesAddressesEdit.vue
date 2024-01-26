<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import companyAddressAPI from "src/services/fetches/companyaddress.js";

import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const router = Router();
const route = useRoute();
const id = route.params.addressId;
const edit = ref(true);

const companyAddress = ref(false)
onMounted(async () => {
  try {
    companyAddress.value = await companyAddressAPI.show(id);
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})

</script>
<template>
  <q-page>
    <CompanyAddressesFrom v-if="companyAddress" :address="companyAddress" :edit="edit"  />
  </q-page>
</template>
