<script setup>
import ReturnButton from 'src/components/ReturnButton.vue';
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import { useRoute, useRouter } from 'vue-router';
import { matDelete } from '@quasar/extras/material-icons'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login';
import companyPeopleAPI from "src/services/fetches/companypeople.js";
const router = useRouter();
const route = useRoute();
const valueCreated = function (data) {
  router.back()
}
const loginStore = useLoginStore()

function showDeleteModal() {
  deleteModel(companyPeopleAPI.destroy, route.params.personId, router, 'do contacto da empresa', `/companies/show/${route.params.id}`);
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Contacto</h1>

      <div class="q-my-md" v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" label="Apagar" />
      </div>
    <CompanyPeopleFrom :edit="true" @valuecreated="valueCreated" />
    <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
