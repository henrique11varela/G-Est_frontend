<template>
  <q-page padding>
    <div class="q-pa-md" v-if="!loading">
      <q-btn unelevated color="secondary" label="Editar" :to="`/classes/edit/${route.params.id}`" v-if="loginStore.isAdmin"/>
      <ClassesInfo :class-info="classInfo"></ClassesInfo>
      <div class="q-mt-md row justify-between">
        <q-btn unelevated color="secondary" label="Editar" :to="`/classes/edit/${route.params.id}/students`" v-if="loginStore.isAdmin"/>
        <q-btn unelevated color="positive" label="Exportar" @click="exportClass(route.params.id, classInfo.name)"/>
      </div>
      <ClassesStudentsList :class-id="route.params.id" :students="students"></ClassesStudentsList>
    </div>
  </q-page>
</template>

<script setup>
import ClassesStudentsList from 'src/components/classes/ClassesStudentsList.vue'
import ClassesInfo from 'src/components/classes/ClassesInfo.vue'
import classesAPI from 'src/services/fetches/classes'
import exportsAPI from 'src/services/fetches/exports'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from 'src/stores/login'
import { Loading } from 'quasar'

const loginStore = useLoginStore()

const classInfo = ref({})
const students = ref([])
const loading = ref(false)
const route = useRoute()

watch(
  () => route.params.id,
  newId => getClass(newId)
)

onMounted(() => {
  getClass(route.params.id)
})

async function exportClass(id, fileName){
  exportsAPI.studentClass(id, fileName)
}

async function getClass(id) {
  loading.value = true
  Loading.show()
  const response = await classesAPI.show(id)
  const { name, course } = response
  classInfo.value = { name, course: course.name}
  students.value = response.students
  Loading.hide()
  loading.value = false
}
</script>
