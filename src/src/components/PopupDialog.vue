<template>
  <div>
    <q-dialog v-model="innerFormStore.isOpen" persistent>
      <component class="bg-white q-pa-lg" :is="innerFormComponent" @valuecreated="innerFormStore?.callbackFn" />
    </q-dialog>
  </div>
</template>

<script setup>
import { defineAsyncComponent, shallowRef, watch } from "vue";
import { useInnerFormStore } from "../stores/innerForm.js";
// import CourseForm from "./courses/CoursesForm.vue";
const innerFormStore = useInnerFormStore();
const innerFormComponent = shallowRef(null);

watch(
  () => innerFormStore.innerFormComponent,
  (newValue) => {
    // innerFormComponent.value = defineAsyncComponent(() => import(`./courses/CoursesForm.vue`));
    innerFormComponent.value = defineAsyncComponent(() => import(`./${newValue}.vue`));
    // innerFormComponent.value = CourseForm
  }
);
</script>

<style scoped>

</style>
