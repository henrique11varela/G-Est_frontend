import notify from './notify'
import { ref } from 'vue'

export function useErrorHandling() {
  const errors = ref({})
  const hasError = key => errors.value.hasOwnProperty(key)
  const isValid = ref(true)

  const checkResponseErrors = (response) => {
    try {
      switch (response.requestStatus) {
        case null:
        case undefined:
        case 500:
          notify.serverError()
          isValid.value = false
          break
        case 422:
          errors.value = response.errors
          isValid.value = false
          break
        case 404:
          notify.notFound()
          isValid.value = false
          break
        case 403:
          notify.unauthorized()
          isValid.value = false
          break
        default:
          errors.value = {}
          isValid.value = true
      }
    } catch (error) {
      notify.serverError()
      isValid.value = false
    }
  }

  return { errors, hasError, isValid, checkResponseErrors }
}

