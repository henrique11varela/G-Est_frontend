<template>
  <div>
    <hr class="q-my-md"/>
    <q-btn
      label="Voltar"
      color="primary"
      @click="router.back()"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
