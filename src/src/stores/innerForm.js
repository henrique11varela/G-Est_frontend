import { computed, ref } from "vue";
import { defineStore } from 'pinia';

export const useInnerFormStore = defineStore('innerForm', () => {

  const innerFormComponentPath = ref("");
  const callbackFn = ref(() => {});
  const isOpen = computed(() => innerFormComponentPath.value !== "");
  let intervalId = null

  /**
   * Opens a form inside a Dialog and returns a promise that resolves when the form is closed
   * @param {string} formComponentPath
   * @returns {Promise}
   */
  function openInnerForm(formComponentPath) {
    innerFormComponentPath.value = formComponentPath;
    const returnedValue = ref(null);

    callbackFn.value = (value) => {
      innerFormComponentPath.value = "";
      callbackFn.value = () => {};
      returnedValue.value = value
    };

    return new Promise((resolve, reject) => {
      intervalId = setInterval(checkIfResolved, 100, resolve, returnedValue);
    })
  }

  function checkIfResolved(resolve, returnedValue) {
    if (returnedValue.value) {
      clearInterval(intervalId);
      resolve(returnedValue.value);
    }
  }

  return {
    innerFormComponentPath,
    callbackFn,
    isOpen,
    openInnerForm,
  }
});