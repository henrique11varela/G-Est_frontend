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
      this.token = await tokenAPI.login(email, password).token
    },
  },
});
