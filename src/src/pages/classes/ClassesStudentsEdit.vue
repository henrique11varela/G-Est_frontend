<template>
  <q-page padding>
    <div v-if="loading">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="2"
      />
    </div>
    <div class="q-pa-md" v-else>
      <h1 class="text-h6">Associar/remover alunos de {{ classInfo.name }}</h1>
      <ClassesStudentsForm :submitting="submitting" :students="classInfo.students" @submit-students="submitStudents"></ClassesStudentsForm>
    </div>
  </q-page>
</template>

<script setup>
import ClassesStudentsForm from 'src/components/classes/ClassesStudentsForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'

const classInfo = ref({})
const loading = ref(true)
const submitting = ref(false)
const route = useRoute()
const router = useRouter()

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
  const response = await classesAPI.show(id)
  classInfo.value = response
  loading.value = false
}

async function submitStudents(editedList) {
  classInfo.value.students = editedList
  submitting.value = true
  const response = await classesAPI.update(classInfo.value)
  submitting.value = false
  //validations go here
  notify.update()
  router.push(`/classes/show/${route.params.id}`)
}
</script>
