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
      <q-btn unelevated color="secondary" icon="edit" label="Editar" :to="`/classes/edit/${route.params.id}`" v-if="isAdmin"/>
      <ClassesInfo :class-info="classInfo"></ClassesInfo>
      <q-btn class="q-mt-md" unelevated color="secondary" icon="edit" label="Editar" :to="`/classes/edit/${route.params.id}/students`" v-if="isAdmin"/>
      <ClassesStudentsList :students="students"></ClassesStudentsList>
    </div>
  </q-page>
</template>

<script setup>
import ClassesStudentsList from 'src/components/classes/ClassesStudentsList.vue'
import ClassesInfo from 'src/components/classes/ClassesInfo.vue'
import classesAPI from 'src/services/fetches/classes'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const classInfo = ref({})
const students = ref([])
const loading = ref(false)
const route = useRoute()

const isAdmin = true

watch(
  () => route.params.id,
  newId => getClass(newId)
)

onMounted(() => {
  getClass(route.params.id)
})

async function getClass(id) {
  loading.value = true
  const response = await classesAPI.show(id)
  const { name, course, startDate } = response
  classInfo.value = { name, course: course.name, startDate}
  students.value = response.students
  loading.value = false
}
</script>
