<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue';
import Router from 'src/router';
import { post } from "src/services/fetches/users.js";
const router = Router();
const $q = useQuasar()
async function addUser(obj) {
  try {
    await post(obj.name, obj.email, obj.password)
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
  <UserFrom :edit="true" @submit-User="addUser" />
</template>
