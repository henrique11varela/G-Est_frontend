<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import { put, getUser } from "src/services/fetches/users.js";
const router = Router();
const $q = useQuasar()
const route = useRoute();
const id = route.params.id;
const edit = ref(false);
async function EditUser(obj) {
  try {
    await put(id, obj);
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
const user = ref(false)
onMounted(async () => {
  try {
    user.value = await getUser(id);
  } catch ($e) {
    await router.push({ path: 'users' });
    await router.go();
  }
})
</script>
<template>
  <UserFrom v-if="user"  @submit-User="EditUser" :User="user" />
</template>
