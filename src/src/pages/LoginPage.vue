<template>
  <q-page class="column q-pa-xl container">
    <h1>Login</h1>

    <q-form @submit.prevent="login">
      <div class="row">
        <q-input outlined v-model="data.credentials.email" label="Email" class="col-12 q-mb-md"
          :error="data.errors.email" />
        <q-input outlined v-model="data.credentials.password" label="Password" type="password" class="col-12"
          :error="data.errors.password" />
        <span v-if="data.errors.request" class="q-mb-md text-negative">Email ou Password errada</span>
        <q-btn color="primary" type="submit" label="Login" style="width: 100%;" />
      </div>
    </q-form>
  </q-page>
</template>
<style scoped></style>
<script setup>
import { reactive } from 'vue'
import tokenAPI from "../services/fetches/token.js";
import Router from "../router"

const router = Router()

const data = reactive({
  credentials: {
    email: "",
    password: "",
  },
  errors: {
    email: false,
    password: false,
    request: false,
  },
})

async function login() {
  data.errors.email = data.credentials.email === ""
  data.errors.password = data.credentials.password === ""
  data.errors.request = false
  if (data.errors.email || data.errors.password) {
    return
  }
  await tokenAPI.get()
  const login_data = await tokenAPI.login(data.credentials.email, data.credentials.password)
  if (login_data?.hasOwnProperty("token")) {
    router.go({ path: '/' })
  }
  else {
    data.errors.email = true
    data.errors.password = true
    data.errors.request = true
  }
}

</script>
