<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Estágio</h1>
        <div>
          <q-btn unelevated color="negative" label="Apagar" @click="deleteClass"
            v-if="loginStore.isAdmin && !!route.params.id" />
        </div>
      </div>
      <InternshipsForm />
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import ReturnButton from "src/components/ReturnButton.vue";
import InternshipsForm from "../../components/internships/internshipsForm.vue";
import internshipsAPI from "../../services/fetches/internships.js";
import { useRoute, useRouter } from 'vue-router'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

function deleteClass() {
  deleteModel(internshipsAPI.destroy, route.params.id, router, 'o estágio')
}
</script>

<style scoped></style>
