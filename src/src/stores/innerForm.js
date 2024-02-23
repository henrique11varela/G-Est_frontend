import { computed, ref, shallowRef } from "vue";
import { defineStore } from 'pinia';

export const useInnerFormStore = defineStore('innerForm', () => {

  const innerFormComponent = shallowRef(null);
  const propid = ref(null);
  const callbackFn = ref(() => {});
  const isOpen = computed(() => innerFormComponent.value !== null);
  let intervalId = null

  /**
   * Opens a form inside a Dialog and returns a promise that resolves when the form is closed
   * @param {object} formComponent
   * @returns {Promise}
   */
  function openInnerForm(formComponent, prop = null) {
    innerFormComponent.value = formComponent;
    const returnedValue = ref(null);
    propid.value = prop;
    callbackFn.value = (value) => {
      innerFormComponent.value = null;
      propid.value = null;
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
    innerFormComponent,
    propid,
    callbackFn,
    isOpen,
    openInnerForm,
  }
});
