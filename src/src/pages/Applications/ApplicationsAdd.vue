<template>
  <q-page padding>
      <h1 class="text-h6">Adicionar Solicitação</h1>
      <ApplicationsForm @valuecreated="postSubmit"/>
  </q-page>
</template>

<script setup>
import ApplicationsForm from 'src/components/Applications/ApplicationsForm.vue'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'

const router = useRouter()
const route = useRoute()

function postSubmit(value) {
  notify.store()
  router.push(`/applications`)
}

</script>
