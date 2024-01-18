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
      <h1 class="text-h6">Editar alunos de {{ classInfo.name }}</h1>
      <ClassesStudentsForm :students="classInfo.students" @submit-students="submitStudents"></ClassesStudentsForm>
    </div>
  </q-page>
</template>

<script setup>
import ClassesStudentsForm from 'src/components/classes/ClassesStudentsForm.vue'
import classesAPI from 'src/services/fetches/classes'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const classInfo = ref({})
const loading = ref(true)
const route = useRoute()
const router = useRouter()
const $q = useQuasar()

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
  classInfo.value = await classesAPI.show(id)
  loading.value = false
}

async function submitStudents(editedList) {
  classInfo.value.students = editedList
  const response = await classesAPI.update(classInfo.value)
  $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Editado'
    })
    router.push(`/classes/show/${route.params.id}`)
}
</script>
