<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar Solicitação</h1>
        <div v-if="loginStore.isAdmin">
          <q-btn unelevated color="negative" label="Apagar" @click="deleteApplication"/>
        </div>
      </div>
      <ApplicationsForm edit @valuecreated="postSubmit"/>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import ApplicationsForm from 'src/components/Applications/ApplicationsForm.vue'
import applicationsAPI from 'src/services/fetches/applications'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from '../../stores/login.js'
import ReturnButton from 'src/components/ReturnButton.vue'

const router = useRouter()
const route = useRoute()

const loginStore = useLoginStore()

function postSubmit(value) {
  notify.update()
  router.push(`/applications`)
}

function deleteApplication() {
  deleteModel(applicationsAPI.destroy, route.params.id, router, 'a solicitação', '/applications', )
}
</script>
