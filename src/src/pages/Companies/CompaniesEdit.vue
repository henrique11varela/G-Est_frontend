<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import notify from 'src/composables/notify'
import { matEdit, matDelete } from '@quasar/extras/material-icons';
import CompanyAPI from "src/services/fetches/companies.js";
import { useLoginStore } from 'src/stores/login';
import { useRoute, useRouter } from 'vue-router';
import deleteModel from 'src/composables/delete';
const route = useRoute();
const router = useRouter();
const valueCreated = async function (data) {
  if (data.status == 200) {

    await router.back()
  }
}
const loginStore = useLoginStore()
function showDeleteModal() {
  deleteModel(CompanyAPI.destroy, route.params.id, router, 'a empresa', '/companies');
}
</script>
<template>
  <q-page padding>

    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Empresa</h1>
      <div v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
      </div>
    </div>
    <CompanyFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
