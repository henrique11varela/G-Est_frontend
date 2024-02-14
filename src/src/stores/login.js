import { computed, ref } from "vue";
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  const userPermission = ref("")

  function setPermission(permission) {
    userPermission.value = permission
  }

  const isAdmin = computed(() => userPermission.value === "admin")

  return {
    userPermission,
    isAdmin,
    setPermission
  }
});
