<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import Router from 'src/router';
const router = Router();

const valueCreated = async function (data) {
  await router.back()
}

</script>
<template>
  <q-page padding>
    <div class="q-ma-lg">
      <h1 class="text-h6">Adicionar Utilizador</h1>

    </div>
    <UserFrom @valuecreated="valueCreated" :edit="false" />
  </q-page>
</template>
