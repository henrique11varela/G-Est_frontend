<template>
  <div class="q-py-md row q-gutter-sm">
    <q-file dense outlined v-model="file" clearable accept=".xlsx" class="col-auto">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>
    <q-btn unelevated color="primary" label="Importar" @click="importClasses" :disabled="!file" class="col-auto"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import importsAPI from 'src/services/fetches/imports'
import { Loading } from 'quasar'
import notify from 'src/composables/notify'

const file = ref(null)
const errors = ref([])
const emit = defineEmits(['imported'])

const hasImportError = computed(() => errors.value.length > 0 ? true : null)

async function importClasses() {
  Loading.show()
  const response = await importsAPI.classes({ file: file.value })
  console.log(response)
  checkResponse(response)
  file.value = null
  Loading.hide()
}

function checkResponse(response) {
  // if (response.errors) {
  //   errors.value = response.errors
  //   return
  // }
  notify.imported()
  emit('imported')
}
</script>

