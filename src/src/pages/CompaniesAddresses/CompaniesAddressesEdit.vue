<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue';
import ReturnButton from 'src/components/ReturnButton.vue';
import { matDelete } from '@quasar/extras/material-icons';
import deleteModel from 'src/composables/delete';
import { useLoginStore } from 'src/stores/login';
import companyAddressAPI from "src/services/fetches/companyaddress.js";
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const loginStore = useLoginStore()

const valueCreated = function (data) {
  router.back()
}
function showDeleteModal() {
  deleteModel(companyAddressAPI.destroy, route.params.addressId, router, 'do endereço', `/companies/show/${route.params.id}`);
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Morada</h1>
      <div class="q-my-md" v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" label="Apagar" />
      </div>
    </div>
    <CompanyAddressesFrom :edit="true" @valuecreated="valueCreated" />
    <ReturnButton></ReturnButton>
  </q-page>
</template>
