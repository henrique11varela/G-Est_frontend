import { defineStore } from 'pinia';
import tokenAPI from "../services/fetches/token.js";

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: "",
  }),
  getters: {
    bearerToken: (state) => state.token
  },
  actions: {
    async login(email, password) {
      tokenAPI.get().then(async () => {
        const tempToken = await tokenAPI.login(email, password)
        this.token = tempToken.token
      })
    },
  },
});
