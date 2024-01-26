<template>
  <q-page class="column q-pa-xl container">
    <h1>Login</h1>

    <q-form @submit.prevent="login">
      <div class="row" >
        <q-input outlined v-model="data.credentials.email" label="Email" style="width: 100%;" />
        <q-input outlined v-model="data.credentials.password" label="Password" type="password" style="width: 100%;"  />
        <q-btn color="primary" type="submit" label="Login" style="width: 100%;" />
      </div>
    </q-form>
  </q-page>
</template>
<style scoped>

</style>
<script setup>
import { reactive } from 'vue'
import tokenAPI from "../services/fetches/token.js";
import Router from "../router"

const router = Router()

const data = reactive({
  credentials: {
    email: "",
    password: "",
  }
})

async function login() {
  //validate client side
  await tokenAPI.get()
  await tokenAPI.login(data.credentials.email, data.credentials.password)
  await router.push({ path: '/' })
  router.go()
}

</script>
