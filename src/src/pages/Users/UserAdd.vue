<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import UserDTO from "src/dto/UserDTO"
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import Router from 'src/router';
import userAPI from "src/services/fetches/users.js";
import ReturnButton from 'src/components/ReturnButton.vue';
const router = Router();
const $q = useQuasar()
async function addUser(obj) {
  try {
    await userAPI.create(UserDTO.output(obj))
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    await router.push({
      path: "users"
    });
    await router.go();
  } catch (e) {
    console.log(e)
  }
}
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
