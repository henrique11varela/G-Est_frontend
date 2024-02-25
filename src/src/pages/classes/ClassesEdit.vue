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
    </div>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import deleteModel from 'src/composables/delete'
import { useLoginStore } from 'src/stores/login'
const loginStore = useLoginStore()

const router = useRouter()
const route = useRoute()

const isAdmin = true

function postSubmit(value) {
  notify.update()
  router.push(`/classes/show/${value.id}`)
}

function deleteClass() {
  deleteModel(classesAPI.destroy, route.params.id, router, 'a turma', '/classes')
}
</script>
