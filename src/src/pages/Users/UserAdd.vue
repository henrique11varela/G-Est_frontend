<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import UserDTO from "src/dto/UserDTO"
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import Router from 'src/router';
import userAPI from "src/services/fetches/users.js";
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
</script>
<template>
  <q-page padding>
    <div class="q-pa-md">
      <UserFrom :edit="true" @submit-User="addUser" />
    </div>
  </q-page>
</template>
