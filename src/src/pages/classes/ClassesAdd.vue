<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h6">Criar turma</h1>
      <ClassesForm @class-submit="createClass"></ClassesForm>
    </div>
  </q-page>
</template>

<script setup>
import ClassesForm from 'src/components/classes/ClassesForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

async function createClass(studentClass) {
  const response = await classesAPI.store(studentClass)
  console.log(response)
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Criado'
  })
  router.push('/classes')
}

</script>
