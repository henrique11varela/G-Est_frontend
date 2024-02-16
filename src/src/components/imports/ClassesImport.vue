<template>
  <div style="max-width: 600px" class="q-py-md row q-gutter-sm">
    <q-file dense outlined v-model="file" class="col-5">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>
    <q-btn unelevated color="primary" label="Importar" @click="importClasses" :disabled="!file" class="col-auto"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import importsAPI from 'src/services/fetches/imports'
import { Loading } from 'quasar'
const file = ref(null)

async function importClasses() {
  Loading.show()
  const response = await importsAPI.classes({ file: file.value })
  console.log(response)
  //TODO validations
  file.value = null
  Loading.hide()

}
</script>

