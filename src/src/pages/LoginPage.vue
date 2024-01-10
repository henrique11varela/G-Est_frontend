<template>
  <q-page class="column q-pa-xl">
    <h1>Login</h1>
    <q-input outlined v-model="data.credentials.email" label="Email" />
    <q-input outlined v-model="data.credentials.password" label="Password" />
    <q-btn color="primary" label="Login" @click="login" />
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useLoginStore } from "../stores/login.js";
import Router from "../router"

const loginStore = useLoginStore()
const router = Router()

const data = reactive({
  credentials: {
    email: "",
    password: "",
  }
})


async function login() {
  //validate client side
  //send login to api
  await loginStore.login(data.credentials.email, data.credentials.password)
  router.push({path: '/'})
  router.go()
}

</script>
