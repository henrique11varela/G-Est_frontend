<script setup>
import ReturnButton from 'src/components/ReturnButton.vue';
import UserFrom from '../../components/users/UserFrom.vue'
import { useRoute, useRouter } from 'vue-router';

import userAPI from "src/services/fetches/users.js";
import { matDelete } from '@quasar/extras/material-icons'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
const router = useRouter();
const valueCreated = async function (data) {
  await router.back()
}

const route = useRoute();
const loginStore = useLoginStore()

function showDeleteModal() {
  deleteModel(userAPI.destroy, route.params.id, router, 'o utilizador', '/users');
}
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Editar Utilizador</h1>
      <div class="q-my-md" v-if="loginStore.isAdmin">
        <q-btn @click="showDeleteModal" color="red" label="Apagar" />
      </div>
      <UserFrom :edit="true" @valuecreated="valueCreated" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
