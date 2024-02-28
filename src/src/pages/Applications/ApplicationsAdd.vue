<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Adicionar Solicitação</h1>
      <ApplicationsForm @valuecreated="postSubmit"/>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import ApplicationsForm from 'src/components/Applications/ApplicationsForm.vue'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import ReturnButton from 'src/components/ReturnButton.vue';

const router = useRouter()
const route = useRoute()

function postSubmit(value) {
  notify.store()
  router.push(`/applications`)
}

</script>
