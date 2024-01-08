import { ref, computed } from "vue";
import { defineStore } from 'pinia';
import tokenAPI from "../services/fetches/token.js";

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
  }

  async function login(email, password) {
    tokenAPI.get()
      .then(async () => {
        const tempToken = await tokenAPI.login(email, password)
        token.value = tempToken.token
        localStorage.setItem('token', token.value)
      })
  }

  return {
    token,
    login,
    bearerToken,
    setToken
  }
});
