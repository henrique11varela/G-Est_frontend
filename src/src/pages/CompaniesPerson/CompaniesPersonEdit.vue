<script setup>
import CompanyPeopleFrom from '../../components/companiesPeople/CompanyPeopleFrom.vue'
import Router from 'src/router';
import { matDelete } from '@quasar/extras/material-icons'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login';
import companyPeopleAPI from "src/services/fetches/companyPeople.js";
const router = Router();
const valueCreated = async function (data) {

  await router.back()
}
const loginStore = useLoginStore()

function showDeleteModal() {
  deleteModel(companyPeopleAPI.destroy, route.params.personId, router, 'do contacto da empresa', '/companies');
}
</script>
<template>
  <q-page padding>
    <div class="q-ma-lg">
      <h1 class="text-h6">Editar Contacto</h1>
      <div v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" :icon="matDelete" label="Delete" />
      </div>
    </div>
    <CompanyPeopleFrom :edit="true" @valuecreated="valueCreated" />

  </q-page>
</template>
