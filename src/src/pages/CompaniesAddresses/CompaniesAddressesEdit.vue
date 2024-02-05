<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import companyAddressAPI from "src/services/fetches/companyaddress.js";

import { Loading, QSpinnerGears } from 'quasar';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const router = Router();
const route = useRoute();
const id = route.params.addressId;
const edit = ref(true);

Loading.show()
const companyAddress = ref(false)
onMounted(async () => {
  try {
    companyAddress.value = await companyAddressAPI.show(id);
    Loading.hide()
  } catch ($e) {
    await router.push({ path: 'companies' });
    await router.go();
  }
})
const valueCreated = function (data) {
  if (data.status == 200) {
    notify.store()
    router.back()
  }
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <CompanyAddressesFrom v-if="companyAddress" :address="companyAddress" :edit="edit" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
