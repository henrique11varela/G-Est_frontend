<template>
  <div class="q-py-md row q-gutter-sm">
    <q-file dense outlined v-model="file" clearable accept=".xlsx" class="col-auto">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>
    <q-btn unelevated color="primary" label="Importar" @click="importClasses" :disabled="!file" class="col-auto"/>
  </div>
  <div class="text-negative">
    <div :key="index" v-for="(error, index) in errors">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import importsAPI from 'src/services/fetches/imports'
import { Loading } from 'quasar'
import notify from 'src/composables/notify'
import { useErrorHandling } from 'src/composables/useErrorHandling'

const { errors, hasError, isValid, checkResponseErrors } = useErrorHandling()

const file = ref(null)
const emit = defineEmits(['imported'])

async function importClasses() {
  Loading.show()
  const response = await importsAPI.classes({ file: file.value })
  checkResponseErrors(response)
  Loading.hide()
  if (isValid.value) {
    notify.imported()
    file.value = null
    emit('imported')
  }
}
</script>

