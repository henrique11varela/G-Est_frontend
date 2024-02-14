<template>
  <div>
    <q-dialog v-model="innerFormStore.isOpen" persistent>
      <div class="bg-white q-pa-lg" style="overflow: hidden;">
        <q-btn icon="close" color="negative" @click="innerFormStore.innerFormComponentPath = ''"></q-btn>
        <component :is="innerFormComponent" @valuecreated="innerFormStore?.callbackFn" />
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { defineAsyncComponent, shallowRef, watch } from "vue";
import { useInnerFormStore } from "../stores/innerForm.js";
const innerFormStore = useInnerFormStore();
const innerFormComponent = shallowRef(null);

watch(
  () => innerFormStore.innerFormComponentPath,
  (newValue) => {
    if (newValue) {
      innerFormComponent.value = defineAsyncComponent(() => import(`./${newValue}.vue`));
    }
  }
);
</script>

<style scoped></style>
