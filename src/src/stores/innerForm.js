import { computed, ref } from "vue";
import { defineStore } from 'pinia';

export const useInnerFormStore = defineStore('innerForm', () => {

  const innerFormComponent = ref("");
  const callbackFn = ref(() => {});
  const isOpen = computed(() => innerFormComponent.value !== "");

  /**
   *
   * @param {string} formComponentPath
   */
  function openInnerForm(formComponentPath, vModelTarget) {
    innerFormComponent.value = formComponentPath;
    callbackFn.value = (value) => {
      innerFormComponent.value = "";
      callbackFn.value = () => {};
      vModelTarget.value = value;
    };
  }

  return {
    innerFormComponent,
    callbackFn,
    isOpen,
    openInnerForm,
  }
});
