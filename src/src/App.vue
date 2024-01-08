<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useLoginStore } from './stores/login';
const loginStore = useLoginStore();

onMounted(() =>
  loginStore.setToken()
)
</script>
