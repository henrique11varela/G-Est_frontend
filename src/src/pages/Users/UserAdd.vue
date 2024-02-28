<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import Router from 'src/router';
import userAPI from "src/services/fetches/users.js";
import ReturnButton from 'src/components/ReturnButton.vue';
const router = Router();

const valueCreated = async function (data) {
  await router.back()
}

</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Adicionar Utilizador</h1>
      <UserFrom @valuecreated="valueCreated" :edit="false" />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>
