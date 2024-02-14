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
    <div class="q-pa-md">
      <UserFrom :edit="true" @valuecreated="valueCreated" />
    </div>
  </q-page>
</template>
