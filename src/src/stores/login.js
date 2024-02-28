import { computed, ref } from "vue";
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  const userPermission = ref("")
  const userRef = ref({})

  function setPermission(permission) {
    userPermission.value = permission
  }
  function setUserInfo(user) {
    userRef.value = user
  }
  const isAdmin = computed(() => userPermission.value === "admin")
  const userInfo = computed(() => userRef.value)
  return {
    userPermission,
    isAdmin,
    setPermission,
    userInfo,
    setUserInfo
  }
});
