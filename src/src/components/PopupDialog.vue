<template>
  <div>
    <q-dialog v-model="innerFormStore.isOpen" persistent>
      <div class="bg-white q-pa-lg" style="overflow: hidden;">
        <q-btn icon="close" color="negative" @click="innerFormStore.innerFormComponent = null"></q-btn>
        <component :is="innerFormStore?.innerFormComponent" :propid="innerFormStore?.propid" @valuecreated="innerFormStore?.callbackFn" />
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { useInnerFormStore } from "../stores/innerForm.js";
const innerFormStore = useInnerFormStore();
</script>

<style scoped></style>
