<script setup>
import CompanyAddressesFrom from 'src/components/companyAddressesList/CompanyAddressesFrom.vue'
import Router from 'src/router';
import { matDelete } from '@quasar/extras/material-icons'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
import companyAddressAPI from "src/services/fetches/companyaddress.js";
import { useRoute } from 'vue-router';
const route = useRoute();
const router = Router();

const loginStore = useLoginStore()

const valueCreated = function (data) {
  router.back()
}
function showDeleteModal() {
  deleteModel(companyAddressAPI.destroy, route.params.addressId, router, 'do endereço', '/companies');
}
</script>
<template>
  <q-page padding>
    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Morada</h1>
      <div v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
      </div>
    </div>
    <CompanyAddressesFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
