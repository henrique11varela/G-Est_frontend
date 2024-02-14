<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Criar Coordenador</h1>
      <CoordinatorsForm @valuecreated="postSubmit"></CoordinatorsForm>
    </div>
  </q-page>
</template>

<script setup>
import CoordinatorsForm from 'src/components/coordinators/CoordinatorsForm.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'

const $q = useQuasar()
const router = useRouter()

function postSubmit(value) {
  notify.store()
  router.push(`/coordinators/`)
}

</script>
