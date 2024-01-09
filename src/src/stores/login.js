import { ref, computed } from "vue";
import { defineStore } from 'pinia';
import tokenAPI from "../services/fetches/token.js";
import { api } from "src/boot/axios.js";

export const useLoginStore = defineStore('login', () => {
  const token = ref("")

  const bearerToken = computed(() => {
    // if (token.value === "") {
    //   redirect to login
    // }
    return `Bearer ${token.value}`
  })

  function setToken(){
    token.value = localStorage.getItem('token')
    api.defaults.headers.common['Authorization'] = bearerToken.value
  }

  async function login(email, password) {
    await tokenAPI.get()
    .then(async () => {
      const tempToken = await tokenAPI.login(email, password)
      token.value = tempToken.token
      localStorage.setItem('token', token.value)
      api.defaults.headers.common['Authorization'] = bearerToken.value
      })
  }

  function logout() {
    token.value = ''
    localStorage.setItem('token', '')
    api.defaults.headers.common['Authorization'] = ''
    //fazer pedido a backend para logout
  }

  return {
    token,
    login,
    logout,
    bearerToken,
    setToken
  }
});
