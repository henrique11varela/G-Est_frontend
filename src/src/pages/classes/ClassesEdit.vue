<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="flex justify-between items-center">
        <h1 class="text-h6">Editar turma</h1>
        <div>
          <q-btn unelevated color="negative" label="Apagar" @click="deleteClass" v-if="loginStore.isAdmin"/>
        </div>
      </div>
      <ClassesForm edit @valuecreated="postSubmit"></ClassesForm>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { useRoute, useRouter } from 'vue-router'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
import ReturnButton from 'src/components/ReturnButton.vue'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

function postSubmit(value) {
  router.push(`/classes/show/${value.id}`)
}

function deleteClass() {
  deleteModel(classesAPI.destroy, route.params.id, router, 'a turma', '/classes')
}
</script>
