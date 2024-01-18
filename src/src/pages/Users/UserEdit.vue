<script setup>
import UserFrom from '../../components/users/UserFrom.vue'

import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Router from 'src/router';
import UserAPI from "src/services/fetches/users.js";
const router = Router();
const $q = useQuasar()
const route = useRoute();
const id = route.params.id;
const edit = ref(true);
async function EditUser(obj) {
  try {
    await UserAPI.update(obj);
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
    user.value = await UserAPI.show(id);
  } catch ($e) {
    console.log($e)
    // await router.push({ path: 'users' });
    // await router.go();
  }
})
</script>
<template>
  <UserFrom v-if="user"  @submit-user="EditUser" :user="user" :edit="edit"/>
</template>
