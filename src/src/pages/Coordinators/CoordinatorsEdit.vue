<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar Coordenador</h1>
        <div v-if="loginStore.isAdmin">
          <q-btn unelevated color="negative" label="Apagar" @click="deleteCoordinator"/>
        </div>
      </div>
      <CoordinatorsForm edit @valuecreated="postSubmit"></CoordinatorsForm>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import CoordinatorsForm from 'src/components/coordinators/CoordinatorsForm.vue'
import coordinatorsAPI from 'src/services/fetches/coordinators'
import { useRoute, useRouter } from 'vue-router'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from '../../stores/login.js'
import ReturnButton from 'src/components/ReturnButton.vue'

const router = useRouter()
const route = useRoute()


const loginStore = useLoginStore()

function postSubmit(value) {
  router.push(`/coordinators`)
}

function deleteCoordinator() {
  deleteModel(coordinatorsAPI.destroy, route.params.id, router, 'o coordenador', '/coordinators', )
}
</script>
