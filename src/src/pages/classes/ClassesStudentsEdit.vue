<template>
  <q-page padding>
    <div class="q-pa-md" v-if="!loading">
      <h1 class="text-h6">Associar/remover alunos de {{ classInfo.name }}</h1>
      <ClassesStudentsForm :students="classInfo.students" @submit-students="submitStudents"></ClassesStudentsForm>
      <ReturnButton></ReturnButton>
    </div>
  </q-page>
</template>

<script setup>
import ClassesStudentsForm from 'src/components/classes/ClassesStudentsForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import { Loading } from 'quasar'
import { useErrorHandling } from 'src/composables/useErrorHandling'
import ReturnButton from 'src/components/ReturnButton.vue'

const classInfo = ref({})
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const { isValid, checkResponseErrors } = useErrorHandling()

watch(
  () => route.params.id,
  async newId => {
    getClass(newId)
  }
)

onMounted(async () => {
  getClass(route.params.id)
})

async function getClass(id) {
  loading.value = true
  Loading.show()
  const response = await classesAPI.show(id)
  checkResponseErrors(response)
  if (isValid.value) classInfo.value = response
  Loading.hide()
  loading.value = false
}

async function submitStudents(editedList) {
  classInfo.value.students = editedList
  Loading.show()
  const response = await classesAPI.update(classInfo.value)
  checkResponseErrors(response)
  Loading.hide()
  if (isValid.value) {
    notify.update()
    router.push(`/classes/show/${route.params.id}`)
  }
}
</script>
