<script setup>
import CompanyFrom from '../../components/companies/CompanyFrom.vue'
import ReturnButton from 'src/components/ReturnButton.vue';
import CompanyAPI from "src/services/fetches/companies.js";
import { useLoginStore } from 'src/stores/login';
import { useRoute, useRouter } from 'vue-router';
import deleteModel from 'src/composables/delete';
const route = useRoute();
const router = useRouter();
const valueCreated = async function (data) {
  if (data) {
   router.back()
  }
}
const loginStore = useLoginStore()
function showDeleteModal() {
  deleteModel(CompanyAPI.destroy, route.params.id, router, 'a empresa', '/companies');
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Empresa</h1>
      <div class="q-my-md" v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" label="Apagar" />
      </div>
      <CompanyFrom :edit="true" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
