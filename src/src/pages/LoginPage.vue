<template>
  <q-page class="">
    <h1>Login</h1>
    <q-input outlined v-model="data.credentials.email" label="Email" />
    <q-input outlined v-model="data.credentials.password" label="Password" />
    <q-btn color="primary" label="Login" @click="login" />
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useLoginStore } from "../stores/login.js";

const loginStore = useLoginStore()

const data = reactive({
  credentials: {
    email: "",
    password: "",
  }
})


function login() {
  //validate client side
  //send login to api
  loginStore.login(data.credentials.email, data.credentials.password)
}


</script>
