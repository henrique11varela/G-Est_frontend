<template>
  <q-page class="column q-pa-xl">
    <h1>Login</h1>
    <q-form @submit="login">
      <q-input outlined v-model="data.credentials.email" label="Email" />
      <q-input outlined v-model="data.credentials.password" label="Password" />
      <q-btn color="primary" type="submit" label="Login" />
    </q-form>
  </q-page>
</template>

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

async function login(e) {
  e.preventDefault()
  //validate client side
  await tokenAPI.get()
  await tokenAPI.login(data.credentials.email, data.credentials.password)
  await router.push({path: '/'})
  router.go()
}

</script>
