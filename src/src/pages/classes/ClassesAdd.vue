<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Criar turma</h1>
      <ClassesForm @valuecreated="postSubmit"></ClassesForm>
    </div>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'

const $q = useQuasar()
const router = useRouter()

function postSubmit(value) {
  notify.store()
  router.push(`/classes/show/${value.id}`)
}

</script>
